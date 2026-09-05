import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Json = Record<string, unknown>;
type AbbaRequest = { objective?: Json; subjectRef?: string; operatingContextId?: string; authorityRef?: string; capabilityRef?: string; requiresHumanApproval?: boolean; execute?: boolean; constraints?: Json; memoryScope?: Json; evidenceRequirements?: unknown[]; steps?: unknown[]; idempotencyKey?: string; };
const json=(body:Json,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8"}});
const isRecord=(v:unknown):v is Json=>!!v&&typeof v==="object"&&!Array.isArray(v);
Deno.serve(async(req)=>{
 if(req.method!=="POST")return json({error:"method_not_allowed"},405);
 const url=Deno.env.get("SUPABASE_URL"), key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
 if(!url||!key)return json({error:"abba_not_configured"},500);
 const auth=req.headers.get("authorization"); if(!auth?.startsWith("Bearer "))return json({error:"missing_authorization"},401);
 const db=createClient(url,key,{global:{headers:{Authorization:auth}}}); const token=auth.slice(7);
 const {data:{user},error:authError}=await db.auth.getUser(token); if(authError||!user)return json({error:"unauthorized"},401);
 let input:AbbaRequest; try{input=await req.json();}catch{return json({error:"invalid_json"},400);}
 if(!isRecord(input.objective)||Object.keys(input.objective).length===0)return json({error:"objective_required"},422);
 const idem=typeof input.idempotencyKey==="string"&&input.idempotencyKey?`abba:request:${input.idempotencyKey}`:null;
 if(idem){const {data:existing}=await db.from("omnii_abba_sessions").select("id,version,lifecycle,authority_ref,objective,started_at").contains("provenance",{idempotencyKey:idem}).maybeSingle(); if(existing)return json({accepted:true,replayed:true,session:existing});}
 const sessionId=`abba:session:${crypto.randomUUID()}`, planId=`abba:plan:${crypto.randomUUID()}`, decisionId=`abba:decision:${crypto.randomUUID()}`;
 const execute=input.execute===true, capabilityRef=typeof input.capabilityRef==="string"?input.capabilityRef:null, authorityRef=typeof input.authorityRef==="string"?input.authorityRef:null, humanApproval=input.requiresHumanApproval===true;
 const provenance={authenticatedUserId:user.id,authenticatedAt:new Date().toISOString(),ingress:"supabase:function:abba",idempotencyKey:idem,executionRequested:execute};
 const {error:sessionError}=await db.from("omnii_abba_sessions").insert({id:sessionId,version:"1",lifecycle:"active",subject_ref:input.subjectRef??null,operating_context_id:input.operatingContextId??null,authority_ref:authorityRef,objective:input.objective,constraints:input.constraints??{},memory_scope:input.memoryScope??{},provenance});
 if(sessionError)return json({error:"session_create_failed",detail:sessionError.message},500);
 const proposedSteps=Array.isArray(input.steps)&&input.steps.length?input.steps:[{type:execute?"authorized_action":"analysis",status:execute?"pending_authorization_check":"proposed"}];
 let authorityChecks:Json={required:execute,provided:!!authorityRef,capabilityProvided:!!capabilityRef,humanApprovalRequired:humanApproval}; let status=execute?"proposed":"proposed"; let blockReason:string|null=null;
 if(execute){
  if(!authorityRef){status="failed";blockReason="missing_authority";}
  else if(!capabilityRef){status="failed";blockReason="missing_capability";}
  else {const {data:guard,error:guardError}=await db.rpc("omnii_abba_guard_action",{p_session_id:sessionId,p_capability_ref:capabilityRef,p_authority_ref:authorityRef,p_requires_human:humanApproval}); if(guardError){status="failed";blockReason=guardError.message;authorityChecks={...authorityChecks,allowed:false,guardError:guardError.message};}else{status="authorized";authorityChecks={...authorityChecks,allowed:true,guard};}}
 }
 const {error:planError}=await db.from("omnii_abba_plans").insert({id:planId,session_id:sessionId,version:"1",status,intent:input.objective,steps:proposedSteps,required_capabilities:capabilityRef?[capabilityRef]:[],required_resources:[],policy_checks:{constitutionalBoundary:"enforced",humanAuthorityBoundary:"preserved",evidenceRequired:true,unknownContextsEscalate:true},authority_checks:authorityChecks,evidence_requirements:input.evidenceRequirements??[],provenance});
 if(planError)return json({error:"plan_create_failed",detail:planError.message},500);
 const {error:decisionError}=await db.from("omnii_abba_decisions").insert({id:decisionId,session_id:sessionId,plan_id:planId,decision_type:execute?"execution_gate":"planning",decision_state:status,rationale:{objective:input.objective,blockReason},evidence_refs:input.evidenceRequirements??[],authority_ref:authorityRef,human_approval_required:humanApproval,human_approval_ref:humanApproval?authorityRef:null,confidence:status==="authorized"?1:0.5});
 if(decisionError)return json({error:"decision_create_failed",detail:decisionError.message},500);
 await db.from("omnii_events").insert({id:crypto.randomUUID(),version:"1",lifecycle:"active",authority:authorityRef?{authorityRef,capabilityRef}:{},provenance:{...provenance,abbaSessionId:sessionId,abbaPlanId:planId,abbaDecisionId:decisionId},payload:{type:execute?"ABBA_EXECUTION_GATE":"ABBA_PLAN_PROPOSED",objective:input.objective,status,blockReason},correlation_id:sessionId,idempotency_key:idem?`${idem}:event`:`abba:event:${sessionId}`,operating_context_id:input.operatingContextId??null});
 return json({accepted:true,sessionId,planId,decisionId,status,executable:execute&&status==="authorized",blockReason,authorityBoundary:"ABBA cannot issue authority, change the constitution, or replace human authority.",plannerMode:"provider-agnostic-control-plane"},execute&&status!=="authorized"?403:202);
});
