# 🎯 SWIRM SELECTION & TEAM ASSEMBLY GUIDE

## Overview
This document explains how to dynamically assemble task-specific AI agent teams by selecting from available swirms.

---

## The Swirm Selection Process

### Flow
```
Task Request
    ↓
Analyze Requirements
    ↓
Query Available Agents
    ↓
Score & Select Best Fit
    ↓
Assemble Team
    ↓
Deploy & Execute
    ↓
Monitor & Learn
```

---

## Step 1: Task Analysis

```typescript
interface TaskRequest {
  id: string;
  description: string;
  type: 'research' | 'execution' | 'analysis' | 'creation';
  requiredCapabilities: string[]; // e.g., ["nlp", "research", "synthesis"]
  constraints?: {
    maxLatency?: number;        // ms
    requireLocal?: boolean;     // privacy/security
    budget?: number;            // $ cost limit
    maxTeamSize?: number;       // 1-10 agents
  };
  context?: Record<string, any>;
}

// Example
const task: TaskRequest = {
  id: 'task_001',
  description: 'Research and summarize latest AI safety papers',
  type: 'research',
  requiredCapabilities: ['web_research', 'document_analysis', 'synthesis'],
  constraints: {
    maxLatency: 5000,
    requireLocal: false,
    budget: 50
  }
};
```

---

## Step 2: Swirm & Agent Inventory

### Swirm 1: Orchestration
```typescript
const orchestrationSwirm = {
  tools: [
    {
      id: 'crewai_v0.45',
      type: 'role_based_orchestration',
      specialties: ['multi_step_tasks', 'collaborative_work'],
      cost: 'free',
      latency: 'low',
      maxAgents: 10,
      licenseModel: 'MIT'
    },
    {
      id: 'langgraph_v0.2',
      type: 'graph_orchestration',
      specialties: ['complex_workflows', 'state_management'],
      cost: 'free',
      latency: 'low',
      maxAgents: 20,
      licenseModel: 'MIT'
    },
    {
      id: 'metagpt_latest',
      type: 'team_simulation',
      specialties: ['coding_tasks', 'project_planning'],
      cost: 'free',
      latency: 'medium',
      maxAgents: 8,
      licenseModel: 'MIT'
    }
  ]
};
```

### Swirm 2: Identity/Minting
```typescript
const identitySwirm = {
  tools: [
    {
      id: 'aries_v0.11',
      type: 'did_vc_management',
      specialties: ['identity_creation', 'credential_issuance'],
      cost: 'free',
      latency: 'medium',
      licenseModel: 'Apache 2.0'
    },
    {
      id: 'veramo_latest',
      type: 'did_vc_typescript',
      specialties: ['web_native_identity', 'browser_wallets'],
      cost: 'free',
      latency: 'low',
      licenseModel: 'MIT'
    }
  ]
};
```

### Swirm 3: Memory & Knowledge
```typescript
const memorySwirm = {
  tools: [
    {
      id: 'weaviate_v1.7',
      type: 'vector_graph_db',
      specialties: ['persistent_memory', 'knowledge_graphs'],
      cost: 'free',
      latency: 'medium',
      capacity: 'unlimited',
      licenseModel: 'BSD-3'
    },
    {
      id: 'qdrant_v1.10',
      type: 'lightweight_vector_db',
      specialties: ['edge_memory', 'local_embeddings'],
      cost: 'free',
      latency: 'low',
      capacity: 'gigabytes',
      licenseModel: 'Apache 2.0'
    },
    {
      id: 'memgpt_v0.4',
      type: 'extended_context',
      specialties: ['long_memory', 'context_management'],
      cost: 'free',
      latency: 'medium',
      licenseModel: 'Apache 2.0'
    }
  ]
};
```

### Swirm 4: User Interface
```typescript
const interfaceSwirm = {
  tools: [
    {
      id: 'openclaw_fork',
      type: 'multi_channel_ui',
      specialties: ['chat', 'telegram', 'slack', 'web'],
      cost: 'free',
      latency: 'low',
      licenseModel: 'Custom'
    },
    {
      id: 'shadow_app',
      type: 'identity_ui',
      specialties: ['ownership_verification', 'credential_display'],
      cost: 'free',
      latency: 'low',
      licenseModel: 'Proprietary'
    }
  ]
};
```

### Swirm 5: Communication
```typescript
const communicationSwirm = {
  tools: [
    {
      id: 'didcomm_protocol',
      type: 'agent_messaging',
      specialties: ['secure_p2p', 'agent_dialogs'],
      cost: 'free',
      latency: 'medium',
      licenseModel: 'Patent_Free'
    },
    {
      id: 'nats_v2.10',
      type: 'message_broker',
      specialties: ['fast_pubsub', 'event_streaming'],
      cost: 'free',
      latency: 'very_low',
      licenseModel: 'Apache 2.0'
    }
  ]
};
```

### Swirm 6: Model Runtime
```typescript
const runtimeSwirm = {
  tools: [
    {
      id: 'ollama_latest',
      type: 'local_llm',
      specialties: ['privacy', 'offline'],
      cost: 'free',
      latency: 'medium',
      models: ['llama2', 'mistral', 'neural-chat'],
      licenseModel: 'MIT'
    },
    {
      id: 'vllm_v0.5',
      type: 'high_throughput_llm',
      specialties: ['batch_processing', 'high_qps'],
      cost: 'free',
      latency: 'low',
      licenseModel: 'Apache 2.0'
    }
  ]
};
```

---

## Step 3: Selection Algorithm

```typescript
interface SelectionScore {
  toolId: string;
  score: number; // 0-100
  reasoning: string;
}

async function scoreAndSelectSwirm(
  task: TaskRequest,
  swirm: any
): Promise<SelectionScore[]> {
  const scores: SelectionScore[] = [];
  
  for (const tool of swirm.tools) {
    let score = 50; // baseline
    
    // Factor 1: Capability match
    const capabilityMatch = task.requiredCapabilities
      .filter(cap => tool.specialties?.includes(cap))
      .length / task.requiredCapabilities.length;
    score += capabilityMatch * 30;
    
    // Factor 2: Latency constraint
    if (task.constraints?.maxLatency) {
      const latencyScore = latencyToScore(tool.latency, task.constraints.maxLatency);
      score += latencyScore * 15;
    }
    
    // Factor 3: Cost constraint
    if (task.constraints?.budget) {
      const costScore = tool.cost === 'free' ? 10 : Math.max(0, 10 - (tool.cost / task.constraints.budget) * 10);
      score += costScore;
    }
    
    // Factor 4: Privacy requirement
    if (task.constraints?.requireLocal) {
      score += tool.specialties?.includes('local') ? 20 : -10;
    }
    
    scores.push({
      toolId: tool.id,
      score: Math.min(100, Math.max(0, score)),
      reasoning: `Capability: ${(capabilityMatch*100).toFixed(0)}%, Latency fit, Cost free, Local: ${tool.specialties?.includes('local') ? 'yes' : 'no'}`
    });
  }
  
  return scores.sort((a, b) => b.score - a.score);
}

function latencyToScore(toolLatency: string, maxLatency: number): number {
  const latencies = { 'very_low': 10, 'low': 50, 'medium': 100, 'high': 500 };
  const latencyMs = latencies[toolLatency] ?? 1000;
  return latencyMs <= maxLatency ? 10 : 0;
}
```

---

## Step 4: Team Assembly Example

### Scenario 1: Research Task
```typescript
const researchTask: TaskRequest = {
  id: 'research_001',
  description: 'Research AI safety papers',
  type: 'research',
  requiredCapabilities: ['research', 'synthesis', 'analysis'],
  constraints: { maxLatency: 5000, requireLocal: false }
};

// Selected Team:
const researchTeam = {
  orchestration: 'crewai_v0.45',           // Multi-step research workflow
  identity: 'aries_v0.11',                 // Track researcher identity
  memory: 'weaviate_v1.7',                 // Store findings in knowledge graph
  communication: 'didcomm_protocol',       // Agents coordinate securely
  runtime: 'vllm_v0.5',                    // Fast LLM inference
  interface: 'openclaw_fork',              // Display results to human
  
  agents: [
    { swirm: 'orchestration', role: 'coordinator', tool: 'crewai' },
    { swirm: 'runtime', role: 'researcher', model: 'mistral' },
    { swirm: 'runtime', role: 'analyzer', model: 'llama2' },
    { swirm: 'memory', role: 'scribe', tool: 'weaviate' }
  ]
};
```

### Scenario 2: Coding Task
```typescript
const codingTask: TaskRequest = {
  id: 'coding_001',
  description: 'Build a React component for data visualization',
  type: 'execution',
  requiredCapabilities: ['coding', 'frontend', 'planning'],
  constraints: { maxLatency: 10000, requireLocal: true, budget: 100 }
};

// Selected Team:
const codingTeam = {
  orchestration: 'metagpt_latest',         // Team simulation (PM, Dev, QA)
  identity: 'veramo_latest',               // Browser-based identity
  memory: 'qdrant_v1.10',                  // Local edge memory
  communication: 'nats_v2.10',             // Fast internal coordination
  runtime: 'ollama_latest',                // Local LLMs for privacy
  interface: 'openclaw_fork',              // Code editor UI
  
  agents: [
    { role: 'product_manager', specialty: 'planning' },
    { role: 'frontend_engineer', specialty: 'react' },
    { role: 'qa_engineer', specialty: 'testing' }
  ]
};
```

### Scenario 3: Minting New AI
```typescript
const mintingTask: TaskRequest = {
  id: 'mint_001',
  description: 'Create and bind new AI citizen to user',
  type: 'creation',
  requiredCapabilities: ['identity_creation', 'credential_issuance', 'memory_init'],
  constraints: {}
};

// Selected Team:
const mintingTeam = {
  orchestration: 'crewai_v0.45',           // Orchestrate minting steps
  identity: 'aries_v0.11',                 // Create DID + issue VC
  memory: 'weaviate_v1.7',                 // Initialize AI's memory space
  communication: 'didcomm_protocol',       // Secure credential exchange
  runtime: 'vllm_v0.5',                    // Setup AI twin instance
  
  agents: [
    { swirm: 'identity', role: 'issuer', tool: 'aries' },
    { swirm: 'memory', role: 'archivist', tool: 'weaviate' },
    { swirm: 'orchestration', role: 'coordinator' }
  ]
};
```

---

## Step 5: Team Deployment

```typescript
async function deployTeam(task: TaskRequest, team: TaskTeam) {
  // 1. Validate team composition
  const validation = validateTeam(task, team);
  if (!validation.valid) {
    throw new Error(`Invalid team: ${validation.errors.join(', ')}`);
  }
  
  // 2. Initialize agents from selected tools
  const agents = await Promise.all(
    team.agents.map(agentSpec => 
      initializeAgent(agentSpec, team)
    )
  );
  
  // 3. Inject shared context
  const context = {
    taskId: task.id,
    taskDescription: task.description,
    teamId: team.id,
    orchestrator: team.orchestration,
    messageRouter: team.communication
  };
  agents.forEach(a => a.context = context);
  
  // 4. Start orchestrator
  const orchestrator = createOrchestrator(team.orchestration, agents);
  
  // 5. Execute
  const result = await orchestrator.execute(task);
  
  // 6. Log & monitor
  await logExecution({
    taskId: task.id,
    teamId: team.id,
    status: result.status,
    duration: result.duration,
    output: result.output
  });
  
  return result;
}
```

---

## Step 6: Dynamic Reselection

```typescript
async function monitorAndReselect(taskId: string, executingTeam: TaskTeam) {
  const checkInterval = 5000; // 5 seconds
  
  const monitor = setInterval(async () => {
    const metrics = await getTeamMetrics(taskId);
    
    // If performance degrades, reselect
    if (metrics.errorRate > 0.1 || metrics.latency > 3000) {
      console.warn(`⚠️ Team performance degraded for ${taskId}`);
      
      // Reselect with same task
      const newTeam = await selectSwirm(task);
      
      // Graceful handoff
      await migrateTeam(executingTeam, newTeam, metrics.state);
      
      // Resume execution
      await resumeExecution(taskId, newTeam, metrics.state);
      
      clearInterval(monitor);
    }
  }, checkInterval);
}
```

---

## Selection Decision Tree

```
Task Arrives
    ├─ Research Type?
    │  ├─ YES → CrewAI (multi-agent) + Weaviate (knowledge) + vLLM (fast)
    │  └─ NO → Continue
    │
    ├─ Coding Type?
    │  ├─ YES → MetaGPT (team sim) + Qdrant (local) + Ollama (privacy)
    │  └─ NO → Continue
    │
    ├─ Identity/Minting Type?
    │  ├─ YES → Aries (DID/VC) + CrewAI (orchestrate) + Weaviate (init memory)
    │  └─ NO → Continue
    │
    ├─ Real-time/Chat Type?
    │  ├─ YES → OpenClaw (UI) + NATS (fast comms) + vLLM (inference)
    │  └─ NO → Continue
    │
    └─ Complex Workflow Type?
       ├─ YES → LangGraph (state) + DIDComm (secure) + Weaviate (context)
       └─ NO → Default: CrewAI + Weaviate + Ollama
```

---

## Team Registry

```typescript
interface TeamRegistry {
  teams: Map<string, TaskTeam>;
  
  async save(team: TaskTeam) {
    this.teams.set(team.id, team);
    // Persist to database
    await db.teams.insert(team);
  }
  
  async getActive() {
    return Array.from(this.teams.values())
      .filter(t => t.status === 'executing');
  }
  
  async getSuccessful(capability: string) {
    // Teams that successfully completed tasks requiring this capability
    return Array.from(this.teams.values())
      .filter(t => t.status === 'completed' && t.capabilities.includes(capability));
  }
}
```

---

## Human Oversight

```typescript
// For sensitive tasks, require human approval
async function executeWithOversight(task: TaskRequest, team: TaskTeam) {
  if (task.requiresHumanApproval) {
    // 1. Show team selection to human
    const approval = await requestHumanApproval({
      task,
      selectedTeam: team,
      estimatedCost: calculateCost(team),
      estimatedTime: estimateExecutionTime(team, task)
    });
    
    if (!approval.approved) {
      throw new Error('Human rejected team selection');
    }
    
    // 2. Log approval
    await logApproval({
      taskId: task.id,
      approvedBy: approval.approver,
      timestamp: new Date()
    });
  }
  
  // 3. Execute as normal
  return deployTeam(task, team);
}
```

---

## Metrics & Learning

```typescript
interface TeamMetrics {
  taskId: string;
  teamId: string;
  successRate: number;           // 0-100%
  avgExecutionTime: number;      // ms
  costPerTask: number;           // $
  userSatisfaction: number;      // 1-5 stars
  errorTypes: string[];
  recommendedImprovement: string;
}

// After each execution, update metrics
async function updateTeamScore(taskId: string) {
  const execution = await getExecution(taskId);
  const metrics = calculateMetrics(execution);
  
  // Feedback loop: improve selection algorithm
  await updateSelectionAlgorithm(metrics);
}
```

---

**Status**: Framework Ready  
**Last Updated**: 2026-07-02  
**Owner**: Carbon Actual Engineering
