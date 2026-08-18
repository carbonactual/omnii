import { OMNII_CONSTITUTIONAL_INVARIANTS } from "./constitutional";
import type { ConstitutionalValidationResult } from "./constitutional";
import { ConstitutionalRegistry } from "./constitutional-registry";

export interface ConstitutionalRuntimeInput {
  declaredOmniRole?: string;
}

export function validateConstitutionalRuntime(
  input: ConstitutionalRuntimeInput = {},
  registry = new ConstitutionalRegistry(),
): ConstitutionalValidationResult {
  const result = registry.validate();
  const violations = [...result.violations];

  if (
    input.declaredOmniRole &&
    (OMNII_CONSTITUTIONAL_INVARIANTS.forbiddenOmniRoles as readonly string[]).includes(input.declaredOmniRole)
  ) {
    violations.push({
      code: "OMNI_ROLE_COLLISION",
      doctrineId: "architecture",
      message: `OMNI cannot be declared as ${input.declaredOmniRole}; OMNI is the omnidirectional ecosystem movement state`,
    });
  }

  return { ...result, valid: violations.length === 0, violations };
}
