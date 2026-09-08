import { NextRequest, NextResponse } from "next/server";
import {
  MissionDefinition,
  MissionIntelligenceRuntime,
  MissionTeamMember,
} from "@/packages/omnii-runtime/src/mission-intelligence-runtime";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!id || id.length > 160) {
    return NextResponse.json({ error: "invalid_team_id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 422 });
  }

  const input = body as Record<string, unknown>;
  if (typeof input.objective !== "string" || !input.objective.trim()) {
    return NextResponse.json({ error: "objective_required" }, { status: 422 });
  }
  if (!Array.isArray(input.members)) {
    return NextResponse.json({ error: "members_required" }, { status: 422 });
  }

  const members = input.members as MissionTeamMember[];
  const mission: MissionDefinition = {
    objective: input.objective.trim(),
    requiredCapabilities: Array.isArray(input.requiredCapabilities)
      ? input.requiredCapabilities.filter((value): value is string => typeof value === "string")
      : [],
    requiredSwirms: Array.isArray(input.requiredSwirms)
      ? input.requiredSwirms.filter((value): value is string => typeof value === "string")
      : [],
    authorityRefs: Array.isArray(input.authorityRefs)
      ? input.authorityRefs.filter((value): value is string => typeof value === "string")
      : [],
    humanApprovalRequired: input.humanApprovalRequired === true,
    allowWarnings: input.allowWarnings === true,
  };

  const invalidMember = members.find(
    (member) =>
      !member ||
      typeof member.id !== "string" ||
      typeof member.swirm !== "string" ||
      !Array.isArray(member.capabilities),
  );
  if (invalidMember) {
    return NextResponse.json({ error: "invalid_team_member" }, { status: 422 });
  }

  const assessment = new MissionIntelligenceRuntime().assess(mission, members);

  return NextResponse.json({
    teamId: id,
    mission,
    assessment,
    executable: assessment.readiness === "ready",
  });
}
