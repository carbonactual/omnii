import {
  MissionAssessment,
  MissionDefinition,
  MissionIntelligenceRuntime,
  MissionTeamMember,
} from "./mission-intelligence-runtime";

export type MissionAdaptationStatus = "adapted" | "halted";

export interface MissionMemberFailure {
  memberId: string;
  reason: string;
}

export interface MissionAdaptationChange {
  failedMemberId: string;
  replacementMemberId: string;
  recoveredCapabilities: string[];
  replacementSwirm: string;
}

export interface MissionAdaptationResult {
  status: MissionAdaptationStatus;
  members: MissionTeamMember[];
  assessment: MissionAssessment;
  changes: MissionAdaptationChange[];
  haltedReason?: string;
  explanation: string[];
}

const unique = (values: string[]): string[] => [...new Set(values)];

const candidateScore = (candidate: MissionTeamMember, required: string[]): number =>
  required.filter((capability) => candidate.capabilities.includes(capability)).length;

function conflictsWithActive(candidate: MissionTeamMember, active: MissionTeamMember[]): boolean {
  const activeIds = new Set(active.map((member) => member.id));
  if ((candidate.conflictsWith ?? []).some((id) => activeIds.has(id))) return true;
  return active.some((member) => (member.conflictsWith ?? []).includes(candidate.id));
}

export class MissionAdaptationRuntime {
  constructor(private readonly intelligence = new MissionIntelligenceRuntime()) {}

  adapt(
    mission: MissionDefinition,
    members: MissionTeamMember[],
    failures: MissionMemberFailure[],
    candidatePool: MissionTeamMember[],
  ): MissionAdaptationResult {
    const failureIds = unique(failures.map((failure) => failure.memberId).filter(Boolean));
    const failureReasons = new Map(failures.map((failure) => [failure.memberId, failure.reason]));
    let working = members.map((member) => ({ ...member }));
    const changes: MissionAdaptationChange[] = [];
    const explanation: string[] = [];

    for (const failedMemberId of failureIds) {
      const failed = working.find((member) => member.id === failedMemberId);
      if (!failed) {
        explanation.push(`failure_ignored:unknown_member:${failedMemberId}`);
        continue;
      }

      working = working.map((member) =>
        member.id === failedMemberId ? { ...member, status: "unavailable" as const } : member,
      );

      const assessmentBefore = this.intelligence.assess(mission, working);
      if (assessmentBefore.readiness !== "blocked") {
        explanation.push(`failure_tolerated:${failedMemberId}`);
        continue;
      }

      const active = working.filter((member) => member.status !== "unavailable" && member.status !== "suspended");
      const missionAuthorityRefs = new Set(mission.authorityRefs ?? []);
      const candidates = candidatePool
        .filter((candidate) => candidate.id !== failedMemberId)
        .filter((candidate) => candidate.status !== "unavailable" && candidate.status !== "suspended")
        .filter((candidate) => !working.some((member) => member.id === candidate.id))
        .filter((candidate) => !conflictsWithActive(candidate, active))
        .filter((candidate) => !candidate.authorityRequired || Boolean(candidate.authorityRef && missionAuthorityRefs.has(candidate.authorityRef)))
        .sort((left, right) => {
          const score = candidateScore(right, assessmentBefore.missingCapabilities) - candidateScore(left, assessmentBefore.missingCapabilities);
          return score || left.id.localeCompare(right.id);
        });

      const replacement = candidates.find((candidate) => {
        const trial = [...working.filter((member) => member.id !== failedMemberId), { ...candidate, status: "selected" as const }];
        const assessment = this.intelligence.assess(mission, trial);
        return assessment.readiness === "ready" || assessment.readiness === "incomplete";
      });

      if (!replacement) {
        const reason = `no_safe_replacement:${failedMemberId}`;
        explanation.push(`${reason}:failure=${failureReasons.get(failedMemberId) ?? "unspecified"}`);
        return {
          status: "halted",
          members: working,
          assessment: this.intelligence.assess(mission, working),
          changes,
          haltedReason: reason,
          explanation,
        };
      }

      const recoveredCapabilities = unique(
        assessmentBefore.coverage
          .filter((entry) => !entry.covered && replacement.capabilities.includes(entry.capability))
          .map((entry) => entry.capability),
      );

      working = [
        ...working.filter((member) => member.id !== failedMemberId),
        { ...replacement, status: "selected" },
      ];
      changes.push({
        failedMemberId,
        replacementMemberId: replacement.id,
        recoveredCapabilities,
        replacementSwirm: replacement.swirm,
      });
      explanation.push(`replacement:${failedMemberId}->${replacement.id}`);
    }

    const assessment = this.intelligence.assess(mission, working);
    const safe = assessment.readiness === "ready" || assessment.readiness === "incomplete";
    return {
      status: safe ? "adapted" : "halted",
      members: working,
      assessment,
      changes,
      haltedReason: safe ? undefined : "adaptation_left_mission_blocked",
      explanation,
    };
  }
}
