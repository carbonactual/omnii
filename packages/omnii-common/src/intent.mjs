export function intentRecord(subject, goal, context = {}) {
  if (!subject || !goal) throw new Error('intent requires subject and goal');
  return { subject, goal, context };
}

export function capabilityDescriptor(name, input = {}, output = {}) {
  if (!name) throw new Error('capability name is required');
  return { name, input, output };
}
