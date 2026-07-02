# 🚀 API Gateway - Carbon Actual Ecosystem

## Overview
Central API layer for Carbon Actual Ecosystem. Routes all requests to appropriate swirms and coordinates multi-agent task execution.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Client (Web/Mobile/API)            │
└──────────────────────────────────────┬───────────────────────┘
               │
        ┌──────────────┐
        │ API Gateway  │  (omnii/app/api)
        │ (routing)    │
        └──────────────┬──────────────────────┐
               │          │          │
               ▼          ▼          ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
    │Swirm         │ │Swirm         │ │Swirm             │
    │Selector      │ │Executor      │ │Monitor           │
    └──────────────┘ └──────────────┘ └──────────────────┘
               │          │          │
               └──────────┬──────────┬┘
                       ▼
        ┌──────────────────────────────────────┐
        │ Integrated Swirms                    │
        │ (CrewAI, Aries, Weaviate, etc)      │
        └──────────────────────────────────────┘
```

---

## Core Endpoints

### 1. Task Creation
```
POST /api/tasks
Content-Type: application/json

{
  "description": "Research and summarize AI safety papers",
  "capabilities": ["research", "synthesis", "analysis"],
  "constraints": {
    "maxLatency": 5000,
    "requireLocal": false,
    "budget": 50
  }
}

Response:
{
  "taskId": "task_001",
  "selectedTeam": {
    "orchestration": "crewai_v0.45",
    "identity": "aries_v0.11",
    "memory": "weaviate_v1.7",
    "communication": "didcomm",
    "runtime": "vllm_v0.5"
  },
  "status": "queued",
  "estimatedTime": 120000
}
```

### 2. AI Minting
```
POST /api/ai/mint

{
  "ownerDid": "did:key:z6...",
  "aiName": "alice_001",
  "initialCapabilities": ["nlp", "reasoning"],
  "lawfulUseCases": ["research", "content_creation"]
}

Response:
{
  "aiDid": "did:key:z6Mkn...",
  "aiName": "alice_001",
  "credential": "eyJhbGc...",
  "memoryInitialized": true,
  "createdAt": "2026-07-02T16:20:00Z",
  "status": "active"
}
```

### 3. Task Status
```
GET /api/tasks/{taskId}

Response:
{
  "taskId": "task_001",
  "status": "executing",
  "progress": 45,
  "agents": [
    {"role": "researcher", "status": "working"},
    {"role": "analyzer", "status": "waiting"}
  ],
  "elapsedTime": 45000,
  "nextUpdate": 5000
}
```

### 4. Task Results
```
GET /api/tasks/{taskId}/result

Response:
{
  "taskId": "task_001",
  "status": "completed",
  "result": {...},
  "metadata": {
    "executionTime": 120000,
    "teamUsed": {...},
    "costEstimate": 2.50,
    "satisfactionScore": 4.8
  }
}
```

### 5. Memory Access
```
GET /api/ai/{aiDid}/memory
Query: ?query=research+papers&limit=10

Response:
{
  "aiDid": "did:key:...",
  "memories": [
    {"timestamp": "...", "content": "...", "relevance": 0.95},
    {...}
  ],
  "totalMemories": 1245,
  "memoryUsage": "2.5GB"
}
```

### 6. Identity Verification
```
GET /api/verify/{did}

Response:
{
  "did": "did:key:...",
  "valid": true,
  "verified": true,
  "credentials": [
    {"type": "AIMinted", "issuer": "carbon-actual", "expiresAt": "2027-07-02"}
  ]
}
```

---

## Implementation

### Base Handler (omnii/lib/api/gateway.ts)
```typescript
import { SwirmSelector } from '@carbon-actual/services/swirm-selector';
import { TaskExecutor } from '@carbon-actual/services/task-executor';

export class APIGateway {
  private swirmSelector = new SwirmSelector();
  private executor = new TaskExecutor();
  
  async createTask(req: TaskRequest) {
    // 1. Validate request
    const validation = this.validateRequest(req);
    if (!validation.valid) throw new Error(validation.error);
    
    // 2. Select swirm
    const team = await this.swirmSelector.selectSwirm({
      taskDescription: req.description,
      requiredCapabilities: req.capabilities,
      constraints: req.constraints
    });
    
    // 3. Create task record
    const task = await db.tasks.create({
      description: req.description,
      selectedTeam: team,
      status: 'queued',
      createdAt: new Date()
    });
    
    // 4. Queue for execution
    await this.executor.queue(task);
    
    return {
      taskId: task.id,
      selectedTeam: team,
      status: 'queued'
    };
  }
  
  async getTaskStatus(taskId: string) {
    const task = await db.tasks.findById(taskId);
    const execution = await this.executor.getStatus(taskId);
    
    return {
      taskId,
      status: execution.status,
      progress: execution.progress,
      agents: execution.agents,
      elapsedTime: execution.elapsedTime
    };
  }
  
  async mintAI(req: AIMintRequest) {
    // 1. Create DID via Aries
    const did = await createDID(req.ownerDid);
    
    // 2. Issue credential
    const credential = await issueAICredential(did, {
      name: req.aiName,
      capabilities: req.initialCapabilities,
      lawfulUseCases: req.lawfulUseCases
    });
    
    // 3. Initialize memory in Weaviate
    const memory = await initializeMemory(did);
    
    // 4. Register in HAPI World
    await registerCitizen(did, req.aiName);
    
    return {
      aiDid: did,
      aiName: req.aiName,
      credential,
      memoryInitialized: true,
      status: 'active'
    };
  }
}
```

---

## Error Handling

```typescript
class APIError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
  }
}

const errors = {
  INVALID_REQUEST: new APIError('INVALID_REQUEST', 'Request validation failed', 400),
  SWIRM_UNAVAILABLE: new APIError('SWIRM_UNAVAILABLE', 'Required swirm not available', 503),
  TASK_NOT_FOUND: new APIError('TASK_NOT_FOUND', 'Task does not exist', 404),
  EXECUTION_FAILED: new APIError('EXECUTION_FAILED', 'Task execution failed', 500),
  AUTH_FAILED: new APIError('AUTH_FAILED', 'Authentication failed', 401),
  PERMISSION_DENIED: new APIError('PERMISSION_DENIED', 'Insufficient permissions', 403)
};
```

---

## Rate Limiting

```
Headers:
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 999
  X-RateLimit-Reset: 1688169600

Limits:
  - /api/tasks: 100 per minute
  - /api/ai/mint: 10 per minute
  - /api/tasks/{id}/result: 1000 per minute (polling safe)
```

---

## Authentication

```typescript
// All requests require Authorization header
Authorization: Bearer {jwt_token}

// JWT payload:
{
  sub: "did:key:...",
  iss: "carbon-actual",
  aud: "ecosystem",
  iat: 1688169600,
  exp: 1688256000,
  scope: "tasks.create tasks.read ai.mint"
}
```

---

## Webhook Events

```
Subscribe: POST /api/webhooks

{
  "url": "https://your-app.com/webhooks",
  "events": ["task.completed", "ai.minted", "error.occurred"]
}

Event payload:
{
  "id": "evt_abc123",
  "type": "task.completed",
  "timestamp": "2026-07-02T16:30:00Z",
  "data": {...}
}
```

---

## Monitoring & Observability

```
Metrics exported to Prometheus:
  - carbon_tasks_total{status}
  - carbon_task_duration_seconds{}
  - carbon_swirm_usage{swirm}
  - carbon_ai_mints_total{}
  - carbon_api_errors_total{code}
```

---

**Status**: Ready for Implementation
**Last Updated**: 2026-07-02
