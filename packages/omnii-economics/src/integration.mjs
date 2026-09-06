import { createIOTransition } from './transition.mjs';
import { evaluateAshAssurance, protectIOTransition as protectEconomicTransition } from './assurance.mjs';
import { authorizeAgentAction } from './agent-authority.mjs';

export function authorizeConsequentialAction({
  transition,
  assurance = {},
  agentAuthority = null,
  agentAction = null,
} = {}) {
  if (!transition?.id) throw new Error('transition.id is required');

  const agentDecision = agentAuthority && agentAction
    ? authorizeAgentAction(agentAuthority, agentAction)
    : { decision: 'allow' };

  if (agentDecision.decision === 'deny') {
    return protectEconomicTransition(
      transition,
      evaluateAshAssurance({ ...assurance, requestedDecision: 'deny' }),
    );
  }

  if (agentDecision.decision === 'escalate') {
    return protectEconomicTransition(
      transition,
      evaluateAshAssurance({ ...assurance, requestedDecision: 'escalate' }),
    );
  }

  return protectEconomicTransition(transition, evaluateAshAssurance(assurance));
}

export function createGovernedIOTransition(input = {}) {
  const transition = createIOTransition(input);
  return authorizeConsequentialAction({
    transition,
    assurance: input.assurance ?? {},
    agentAuthority: input.agentAuthority ?? null,
    agentAction: input.agentAction ?? null,
  });
}
