import assert from "node:assert/strict";
import test from "node:test";
import { assertIntegrationRecord } from "../src/integration/integration";
import { isValidIntegrationTransition, assertCapabilityAdmissionOrder, CAPABILITY_ADMISSION_GATES } from "../src/integration/lifecycle";
import { correlateIdentity, createIdentityRef } from "../src/integration/identity";
import { authorizeResolution, resolveIdentity } from "../src/integration/resolution";
import { deriveCapabilityId, evaluateCapabilityAdmission } from "../src/integration/capability";
import { rankIntegrationRoutes, supportsProtocolIntent } from "../src/integration/routing";
import { accountIntegrationOutcome } from "../src/integration/accountability";
import { EnsResolverAdapter, DidResolverAdapter } from "../src/integration/adapters/resolvers";
import { McpProtocolAdapter, LocalProtocolAdapter } from "../src/integration/adapters/protocols";

test("integration lifecycle fails closed and revoked state cannot reactivate",()=>{
  const record={integrationId:"integration:example",source:{kind:"service",id:"source:1"},target:{kind:"capability",id:"cap:1"},relationship:"provides",protocol:"MCP",trustState:"quarantined" as const,authorityRequirements:["policy"],provenance:{source:"test"},state:"QUARANTINED" as const};
  assert.doesNotThrow(()=>assertIntegrationRecord(record)); assert.equal(isValidIntegrationTransition("QUARANTINED","TESTING"),true); assert.equal(isValidIntegrationTransition("REVOKED","ACTIVE"),false);
});

test("resolution remains separate from authorization and correlation",()=>{
  const did=createIdentityRef("did","did:example:1"), ens=createIdentityRef("ens","alice.eth");
  const resolved=resolveIdentity({reference:ens,adapterId:"ens:test",status:"resolved",records:{},evidence:[{kind:"resolver",source:"test",proofRef:"proof:1"}]});
  assert.equal(authorizeResolution(resolved),false); assert.equal(authorizeResolution({...resolved,verified:true}),true); assert.equal(correlateIdentity([did,ens],[{kind:"link",source:"test",target:did.value,proofRef:"proof:1"}]).decision,"correlated");
});

test("capability identity is provider-neutral and admission is ordered",()=>{
  const card={capabilityId:deriveCapabilityId("search","1.0.0"),name:"search",version:"1.0.0",implementations:[{implementationId:"impl:local",provider:"provider:local",protocol:"LOCAL",version:"1"}]};
  assert.equal(evaluateCapabilityAdmission({card,licenseChecked:true,securityChecked:false,sbomChecked:true,provenanceVerified:true,sandboxPassed:true,capabilityTestPassed:true,pulseTestPassed:true,policyApproved:true,evidenceRefs:["e1"]}).admitted,false);
  assert.doesNotThrow(()=>assertCapabilityAdmissionOrder(CAPABILITY_ADMISSION_GATES)); assert.throws(()=>assertCapabilityAdmissionOrder(["SECURITY","LICENSE"]));
});

test("routing chooses safe rails and can return no-safe-route",()=>{
  const base=(protocol:"MCP"|"LOCAL")=>({routeId:protocol,capabilityId:"capability:search@1.0.0",protocol,providerId:`provider:${protocol}`,capabilityFit:1,authoritySatisfied:true,privacyScore:.9,availability:.9,trustScore:.9,valueScore:.8,latencyScore:.8,costScore:.8,dataBoundaryScore:.9,jurisdictionScore:.9,safe:true});
  assert.equal(rankIntegrationRoutes({intent:"structured-tool-data",requiredCapabilityId:"capability:search@1.0.0"},[base("LOCAL"),base("MCP")]).selected?.protocol,"MCP");
  assert.equal(rankIntegrationRoutes({intent:"direct-service",requiredCapabilityId:"capability:search@1.0.0"},[{...base("MCP"),safe:false}]).outcome,"no-safe-route"); assert.equal(supportsProtocolIntent("LOCAL","private-edge"),true);
});

test("integration adapters normalize external rails without becoming authority",async()=>{
  const proof=[{kind:"resolver",source:"test",proofRef:"proof:1"}]; const did=new DidResolverAdapter("did:test",[{method:"example",resolve:async()=>({records:{id:"did:example:1"},evidence:proof,verified:true})}]);
  assert.equal((await did.resolve({scheme:"did",method:"example",value:"did:example:1"})).verified,true);
  const ens=new EnsResolverAdapter("ens:test",async()=>({records:{name:"alice.eth"},evidence:proof,verified:false})); assert.equal((await ens.resolve({scheme:"ens",name:"alice.eth"})).status,"resolved");
  const executor=async()=>({status:"success" as const,completed:true,evidenceRefs:["e1"],proofRefs:["p1"],output:{ok:true}}); const mcp=new McpProtocolAdapter("mcp:test",executor); const local=new LocalProtocolAdapter("local:test",executor); assert.equal((await mcp.execute({capabilityId:"c",input:{}})).protocol,"MCP"); assert.equal((await local.execute({capabilityId:"c",input:{}})).protocol,"LOCAL");
});

test("failed integration remains accountable and un-tokenized",()=>{const result=accountIntegrationOutcome({integrationId:"integration:dns",status:"dns-failure",completed:false,valueSent:25,proofRefs:["p"],evidenceRefs:["e"]});assert.equal(result.minted.location,"terminal");assert.equal(result.minted.tokenized,false);assert.equal(result.unresolvedValue,25);});
