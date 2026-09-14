import { MissionAssessment, MissionDefinition, MissionIntelligenceRuntime, MissionTeamMember } from "./mission-intelligence-runtime";
export type MissionAdaptationStatus = "adapted" | "halted";
export interface MissionMemberFailure { memberId:string; reason:string; }
export interface MissionAdaptationChange { failedMemberId:string; replacementMemberId:string; recoveredCapabilities:string[]; replacementSwirm:string; }
export interface MissionAdaptationResult { status:MissionAdaptationStatus; members:MissionTeamMember[]; assessment:MissionAssessment; changes:MissionAdaptationChange[]; haltedReason?:string; explanation:string[]; }
const unique=(values:string[])=>[...new Set(values)];
const candidateScore=(candidate:MissionTeamMember,required:string[])=>required.filter((c)=>candidate.capabilities.includes(c)).length;
function conflictsWithActive(candidate:MissionTeamMember,active:MissionTeamMember[]){const ids=new Set(active.map((m)=>m.id)); if((candidate.conflictsWith??[]).some((id)=>ids.has(id))) return true; return active.some((m)=>(m.conflictsWith??[]).includes(candidate.id));}
export class MissionAdaptationRuntime {
 constructor(private readonly intelligence=new MissionIntelligenceRuntime()){}
 adapt(mission:MissionDefinition,members:MissionTeamMember[],failures:MissionMemberFailure[],candidatePool:MissionTeamMember[]):MissionAdaptationResult{
  const failureIds=unique(failures.map((f)=>f.memberId).filter(Boolean)); const failureReasons=new Map(failures.map((f)=>[f.memberId,f.reason])); let working=members.map((m)=>({...m})); const changes:MissionAdaptationChange[]=[]; const explanation:string[]=[];
  for(const failedMemberId of failureIds){const failed=working.find((m)=>m.id===failedMemberId); if(!failed){explanation.push(`failure_ignored:unknown_member:${failedMemberId}`);continue;} working=working.map((m)=>m.id===failedMemberId?{...m,status:"unavailable" as const}:m); const before=this.intelligence.assess(mission,working); if(before.readiness!=="blocked"){explanation.push(`failure_tolerated:${failedMemberId}`);continue;}
   const active=working.filter((m)=>m.status!=="unavailable"&&m.status!=="suspended"); const refs=new Set(mission.authorityRefs??[]);
   const candidates=candidatePool.filter((c)=>c.id!==failedMemberId).filter((c)=>c.status!=="unavailable"&&c.status!=="suspended").filter((c)=>!working.some((m)=>m.id===c.id)).filter((c)=>!conflictsWithActive(c,active)).filter((c)=>!c.authorityRequired||Boolean(c.authorityRef&&refs.has(c.authorityRef))).sort((a,b)=>candidateScore(b,before.missingCapabilities)-candidateScore(a,before.missingCapabilities)||a.id.localeCompare(b.id));
   const replacement=candidates.find((candidate)=>{const trial=[...working.filter((m)=>m.id!==failedMemberId),{...candidate,status:"selected" as const}]; const assessment=this.intelligence.assess(mission,trial); return assessment.readiness==="ready"||assessment.readiness==="incomplete";});
   if(!replacement){const reason=`no_safe_replacement:${failedMemberId}`; explanation.push(`${reason}:failure=${failureReasons.get(failedMemberId)??"unspecified"}`); return {status:"halted",members:working,assessment:this.intelligence.assess(mission,working),changes,haltedReason:reason,explanation};}
   const recovered=unique(before.coverage.filter((e)=>!e.covered&&replacement.capabilities.includes(e.capability)).map((e)=>e.capability)); working=[...working.filter((m)=>m.id!==failedMemberId),{...replacement,status:"selected"}]; changes.push({failedMemberId,replacementMemberId:replacement.id,recoveredCapabilities:recovered,replacementSwirm:replacement.swirm}); explanation.push(`replacement:${failedMemberId}->${replacement.id}`);
  }
  const assessment=this.intelligence.assess(mission,working); const safe=assessment.readiness==="ready"||assessment.readiness==="incomplete"; return {status:safe?"adapted":"halted",members:working,assessment,changes,haltedReason:safe?undefined:"adaptation_left_mission_blocked",explanation};
 }
}
