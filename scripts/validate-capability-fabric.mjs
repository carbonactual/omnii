import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "data/canonical/omnii-capability-fabric-provider-matrix.json",
  "data/canonical/omnii-capability-fabric-meta-providers.json",
];
const requiredCapabilityFields = ["id", "operation", "sideEffect", "riskClass", "authorityClass"];
const riskClasses = new Set(["low", "medium", "high", "critical"]);
const sideEffects = new Set(["none", "compute", "network", "external-query", "external-write", "secret-management"]);
const authorityClasses = new Set(["none", "provider-scoped", "delegated", "human-required"]);
const credentialKey = /(api[_-]?key|token|secret|password|credential|private[_-]?key|authorization|bearer)/i;
const secretValue = /(?:bearer\s+)?[A-Za-z0-9_./+=:-]{16,}/i;

const errors = [];
const entries = [];

for (const relative of files) {
  const filename = path.join(root, relative);
  if (!fs.existsSync(filename)) {
    errors.push(`missing_file:${relative}`);
    continue;
  }
  let document;
  try {
    document = JSON.parse(fs.readFileSync(filename, "utf8"));
  } catch (error) {
    errors.push(`invalid_json:${relative}:${error instanceof Error ? error.message : String(error)}`);
    continue;
  }
  if (document.status !== "canonical-seed") errors.push(`invalid_status:${relative}`);
  if (!Array.isArray(document.providers) || document.providers.length === 0) {
    errors.push(`providers_required:${relative}`);
    continue;
  }
  for (const provider of document.providers) {
    if (!provider?.providerId || !provider?.displayName) errors.push(`provider_identity_required:${relative}`);
    if (!Array.isArray(provider?.capabilities) || provider.capabilities.length === 0) {
      errors.push(`capabilities_required:${relative}:${provider?.providerId ?? "unknown"}`);
      continue;
    }
    for (const capability of provider.capabilities) {
      for (const field of requiredCapabilityFields) {
        if (!capability?.[field]) errors.push(`capability_field_required:${provider.providerId}:${field}`);
      }
      if (!riskClasses.has(capability.riskClass)) errors.push(`invalid_risk:${provider.providerId}:${capability.id}`);
      if (!sideEffects.has(capability.sideEffect)) errors.push(`invalid_side_effect:${provider.providerId}:${capability.id}`);
      if (!authorityClasses.has(capability.authorityClass)) errors.push(`invalid_authority_class:${provider.providerId}:${capability.id}`);
      entries.push({ providerId: provider.providerId, capabilityId: capability.id });
    }
  }

  const serialized = JSON.stringify(document);
  if (credentialKey.test(serialized) && secretValue.test(serialized.replace(/"securityInvariant"[^,}]+/g, ""))) {
    errors.push(`possible_credential_material:${relative}`);
  }
}

const seen = new Set();
for (const entry of entries) {
  const key = `${entry.providerId}::${entry.capabilityId}`;
  if (seen.has(key)) errors.push(`duplicate_provider_capability:${key}`);
  seen.add(key);
}

const canonicalIds = new Set(entries.map((entry) => entry.capabilityId));
if (!canonicalIds.has("capability.source_control.repository_read")) errors.push("required_capability_missing:source_control.repository_read");
if (!canonicalIds.has("capability.analytics.chart_query")) errors.push("required_capability_missing:analytics.chart_query");
if (!canonicalIds.has("capability.ai.model_provider")) errors.push("required_capability_missing:ai.model_provider");
if (!canonicalIds.has("capability.automation.scheduled_search")) errors.push("required_capability_missing:automation.scheduled_search");

if (errors.length) {
  console.error("CACF CONFORMANCE FAILED");
  for (const error of errors.sort()) console.error(error);
  process.exit(1);
}

console.log(`CACF CONFORMANT: ${entries.length} provider capability mappings across ${new Set(entries.map((entry) => entry.providerId)).size} providers`);
