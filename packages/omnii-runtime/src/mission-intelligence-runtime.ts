export type MissionReadiness = "ready" | "blocked" | "incomplete";

export interface MissionTeamMember {
  id: string;
  swirm: string;
  capabilities: string[];
  dependsOn?: string[];
  conflictsWith?: string[];
  authorityRequired?: boolean;
  authorityRef?: string;
  status?: "available" | "selected" | "restricted" | "suspended" | "unavailable";
}

export interface MissionDefinition {
  objective: string;
  requiredCapabilities?: string[];
  requiredSwirms?: string[];
  authorityRefs?: string[];
  humanApprovalRequired?: boolean;
  allowWarnings?: boolean;
}

export interface MissionCoverage {
  capability: string;
  memberIds: string[];
  covered: boolean;
}

export interface MissionAuthorityRequirement {
  memberId: string;
  required: boolean;
  satisfied: boolean;
  authorityRef?: string;
}

export interface MissionAssessment {
  readiness: MissionReadiness;
  objective: string;
  coverage: MissionCoverage[];
  missingCapabilities: string[];
  missingSwirms: string[];
  missingDependencies: Array<{ memberId: string; dependencyId: string }>;
  dependencyCycles: string[][];
  conflicts: Array<{ memberId: string; conflictingMemberId: string }>;
  authorityRequirements: MissionAuthorityRequirement[];
  humanApprovalRequired: boolean;
  executionOrder: string[];
  blockingReasons: string[];
  warnings: string[];
  explainability: string[];
}

const unique = (values: string[]): string[] => [...new Set(values)];

function topoSort(members: MissionTeamMember[]): { order: string[]; missing: Array<{ memberId: string; dependencyId: string }>; cycles: string[][] } {
  const byId = new Map(members.map((member) => [member.id, member]));
  const missing: Array<{ memberId: string; dependencyId: string }> = [];
  const state = new Map<string, 0 | 1 | 2>();
  const order: string[] = [];
  const cycles: string[][] = [];
  const stack: string[] = [];

  const visit = (id: string): void => {
    const current = state.get(id) ?? 0;
    if (current === 2) return;
    if (current === 1) {
      const start = stack.indexOf(id);
      cycles.push(start >= 0 ? [...stack.slice(start), id] : [id]);
      return;
    }
    state.set(id, 1);
    stack.push(id);
    const member = byId.get(id);
    for (const dependencyId of member?.dependsOn ?? []) {
      if (!byId.has(dependencyId)) {
        missing.push({ memberId: id, dependencyId });
        continue;
      }
      visit(dependencyId);
    }
    stack.pop();
    state.set(id, 2);
    order.push(id);
  };

  for (const member of members) visit(member.id);
  return { order, missing, cycles };
}

function findConflicts(members: MissionTeamMember[]): Array<{ memberId: string; conflictingMemberId: string }> {
  const ids = new Set(members.map((member) => member.id));
  const conflicts: Array<{ memberId: string; conflictingMemberId: string }> = [];
  for (const member of members) {
    for (const conflictingMemberId of member.conflictsWith ?? []) {
      if (!ids.has(conflictingMemberId)) continue;
      conflicts.push({ memberId: member.id, conflictingMemberId });
    }
  }
  return conflicts.filter((pair, index, all) => {
    const normalized = [pair.memberId, pair.conflictingMemberId].sort().join("::");
    return all.findIndex((item) => [item.memberId, item.conflictingMemberId].sort().join("::") === normalized) === index;
  });
}

export class MissionIntelligenceRuntime {
  assess(mission: MissionDefinition, members: MissionTeamMember[]): MissionAssessment {
    const requiredCapabilities = unique((mission.requiredCapabilities ?? []).filter(Boolean));
    const requiredSwirms = unique((mission.requiredSwirms ?? []).filter(Boolean));
    const activeMembers = members.filter((member) => member.status !== "unavailable" && member.status !== "suspended");

    const coverage = requiredCapabilities.map((capability) => {
      const memberIds = activeMembers.filter((member) => member.capabilities.includes(capability)).map((member) => member.id);
      return { capability, memberIds, covered: memberIds.length > 0 };
    });

    const missingCapabilities = coverage.filter((entry) => !entry.covered).map((entry) => entry.capability);
    const presentSwirms = new Set(activeMembers.map((member) => member.swirm));
    const missingSwirms = requiredSwirms.filter((swirm) => !presentSwirms.has(swirm));
    const dependency = topoSort(activeMembers);
    const conflicts = findConflicts(activeMembers);
    const authorityRequirements = activeMembers
      .filter((member) => member.authorityRequired === true)
      .map((member) => ({ memberId: member.id, required: true, satisfied: Boolean(member.authorityRef), authorityRef: member.authorityRef }));

    const missingAuthority = authorityRequirements.filter((item) => !item.satisfied).map((item) => item.memberId);
    const humanApprovalRequired = mission.humanApprovalRequired === true;
    const blockingReasons: string[] = [];
    const warnings: string[] = [];

    if (missingCapabilities.length) blockingReasons.push(`missing_capabilities:${missingCapabilities.join(",")}`);
    if (missingSwirms.length) blockingReasons.push(`missing_swirms:${missingSwirms.join(",")}`);
    if (dependency.missing.length) blockingReasons.push("missing_dependencies");
    if (dependency.cycles.length) blockingReasons.push("dependency_cycle");
    if (conflicts.length) blockingReasons.push("member_conflict");
    if (missingAuthority.length) blockingReasons.push(`missing_authority:${missingAuthority.join(",")}`);
    if (humanApprovalRequired) warnings.push("human_approval_required_before_consequential_execution");
    if (!activeMembers.length) blockingReasons.push("empty_team");
    if (members.length !== activeMembers.length) warnings.push("restricted_or_suspended_members_excluded");

    const readiness: MissionReadiness = blockingReasons.length > 0 ? "blocked" : humanApprovalRequired ? "incomplete" : "ready";
    const explainability = [
      `objective=${mission.objective}`,
      `team_members=${activeMembers.length}`,
      `swirms=${unique(activeMembers.map((member) => member.swirm)).join(",") || "none"}`,
      `capability_coverage=${coverage.filter((entry) => entry.covered).length}/${coverage.length}`,
      `execution_order=${dependency.order.join(",") || "none"}`,
      `authority_requirements=${authorityRequirements.length}`,
      `readiness=${readiness}`
    ];

    return {
      readiness,
      objective: mission.objective,
      coverage,
      missingCapabilities,
      missingSwirms,
      missingDependencies: dependency.missing,
      dependencyCycles: dependency.cycles,
      conflicts,
      authorityRequirements,
      humanApprovalRequired,
      executionOrder: dependency.order,
      blockingReasons,
      warnings,
      explainability
    };
  }
}
