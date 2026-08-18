# OMNII WORKFLOW RUNTIME

Runtime execution of registered workflows.

## Model
`trigger → validate → plan → authorize → execute step → observe → transition → continue/branch/retry/escalate → complete/fail`

Each step resolves explicit capabilities, dependencies, resources, authority, and compensation semantics. Workflow state is durable and observable.