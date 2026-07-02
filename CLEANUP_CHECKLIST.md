# 📋 CARBON ACTUAL CLEANUP & CONSOLIDATION PLAN

## Phase 1: Immediate Actions (This Week)

### 1.1 Repository Audits & Fixes

#### omnii
- [ ] **Issue 1-8 Triage**: Review all 8 open issues
  - [ ] Categorize: Bug vs Feature vs Cleanup
  - [ ] Create labels: `swirm-*`, `priority-*`
  - [ ] Link to architecture blueprint
- [ ] **Package.json Cleanup**: 
  - [ ] Rename root `"name": "bunk"` → `"name": "@carbonactual/nexus"`
  - [ ] Rename apps/web `"name": "@bunk/web"` → `"name": "@carbonactual/nexus-web"`
  - [ ] Update all workspace references
- [ ] **Branch Cleanup**:
  - [ ] Delete all feature branches older than 30 days
  - [ ] Archive/delete `develop` if not used
  - [ ] Consolidate to `main` + `staging`

#### abba-mas
- [ ] **Rename Check**: Already uses proper names (bunk product, shared-contracts)
- [ ] **Consolidate**: Move shared-contracts to top-level monorepo `/packages`
- [ ] **Version Alignment**: Match Next.js version with omnii (latest)

#### Shadow
- [ ] **API Completion**: Finish apps/api package.json (currently truncated)
- [ ] **Schema Fix**: Review Supabase schema, ensure alignment with abba-mas

#### openclaw
- [ ] **Fork Audit**: Document what's customized vs upstream
- [ ] **Plugin Inventory**: List all extensions + maintenance status
- [ ] **Deprecation Review**: Mark abandoned extensions

---

### 1.2 GitHub Organization Setup

```bash
# Create these orgs (manual via GitHub UI)
Organizations to create:
  ✓ carbon-actual (main ecosystem)
  ✓ hapi-world (AI-native world)

Teams to create:
  carbon-actual/
    ├── @core-engineering (omnii, abba-mas, integration)
    ├── @identity-team (Shadow, DID/VC work)
    ├── @memory-team (Knowledge/Weaviate integration)
    └── @interface-team (openclaw, user-facing)
  
  hapi-world/
    ├── @ai-citizens (AI agents, minting)
    ├── @world-builders (HAPI simulation, growth)
    └── @overseers (Human review, governance)
```

---

### 1.3 Unified Documentation

Create in omnii root:

```
omnii/
├── ECOSYSTEM_ARCHITECTURE.md ✅ (already created)
├── OSS_INTEGRATION_GUIDE.md ✅ (already created)
├── CLEANUP_CHECKLIST.md (this file)
├── SWIRM_SELECTION.md (new - how to compose teams)
├── API_GATEWAY.md (new - unified API layer)
├── CODEOWNERS (new - team responsibilities)
├── CONTRIBUTING.md (new - dev guidelines)
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── swirm-integration.md
    │   ├── ai-minting.md
    │   └── memory-feature.md
    └── PULL_REQUEST_TEMPLATE/
        └── integration.md
```

---

## Phase 2: Code Structure (Week 2)

### 2.1 Monorepo Consolidation

**Target Structure**:
```
carbon-ecosystem/
├── apps/
│   ├── nexus/              (omnii → renamed)
│   ├── shadow/             (identity platform)
│   ├── bunk/               (marketplace/assets)
│   └── openclaw-wrapper/   (fork management)
│
├── packages/
│   ├── shared-contracts/   (from abba-mas)
│   ├── integrations/       (all swirm connectors)
│   │   ├── crewai-adapter/
│   │   ├── aries-adapter/
│   │   ├── weaviate-adapter/
│   │   ├── memgpt-adapter/
│   │   └── didcomm-router/
│   ├── types/              (shared TypeScript definitions)
│   ├── cli/                (command-line tooling)
│   └── ui/                 (shared components)
│
├── services/
│   ├── ai-minting/         (mint new AIs)
│   ├── swirm-selector/     (pick agents for tasks)
│   ├── task-executor/      (run assembled teams)
│   └── hapi-world-runtime/ (AI world simulation)
│
├── docs/
│   ├── architecture/
│   ├── api-reference/
│   ├── integration-guides/
│   └── team-assembly-howto/
│
├── scripts/
│   ├── setup-dev.sh
│   ├── deploy-swirm.sh
│   └── mint-ai.sh
│
└── docker-compose.yml      (all services)
```

**Actions**:
- [ ] Create new repo: `carbon-actual/ecosystem` (or similar)
- [ ] Move files from carbonactual/omnii, abba-mas, Shadow into structure
- [ ] Create root package.json with workspaces
- [ ] Set up monorepo build pipeline

### 2.2 Root package.json

```json
{
  "name": "@carbon-actual/ecosystem",
  "version": "0.1.0",
  "workspaces": [
    "apps/*",
    "packages/*",
    "services/*"
  ],
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "setup": "turbo run setup",
    "mint-ai": "node scripts/mint-ai.sh"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.8.3"
  }
}
```

### 2.3 Shared Contracts Integration

```typescript
// packages/shared-contracts/src/index.ts
export interface AIMinted {
  id: string;
  did: string; // DID from Aries
  name: string;
  createdAt: Date;
  owner: {
    did?: string; // Human owner (optional)
    email?: string;
  };
  capabilities: string[];
  memory?: {
    weaviateId: string;
    vectorDbUrl: string;
  };
}

export interface SwirmTask {
  id: string;
  description: string;
  requiredSwirms: string[]; // ["orchestration", "identity", "memory"]
  selectedAgents: Record<string, string>;
  status: 'pending' | 'executing' | 'complete' | 'failed';
  result?: any;
}

export interface TaskTeam {
  taskId: string;
  agents: Array<{
    swirm: string;
    toolId: string;
    role: string;
  }>;
  createdAt: Date;
  completedAt?: Date;
}
```

---

## Phase 3: Integration Layer (Week 3)

### 3.1 Swirm Selector Engine

```typescript
// services/swirm-selector/src/index.ts
interface SwirmRequest {
  taskDescription: string;
  requiredCapabilities: string[];
  constraints?: {
    maxLatency?: number;
    requireLocal?: boolean;
    budget?: number;
  };
}

interface SwirmTeam {
  orchestration: 'crewai' | 'langgraph' | 'metagpt';
  identity: 'aries' | 'veramo';
  memory: 'weaviate' | 'qdrant' | 'memgpt';
  communication: 'didcomm' | 'nats';
  runtime: 'openclaw' | 'ollama' | 'vllm';
}

export async function selectSwirm(request: SwirmRequest): Promise<SwirmTeam> {
  // Logic to pick best-fit tools from each swirm
  // Based on task, latency, privacy requirements
  
  const team: SwirmTeam = {
    orchestration: request.requiredCapabilities.includes('collab') 
      ? 'crewai' 
      : 'langgraph',
    identity: 'aries',
    memory: request.constraints?.requireLocal 
      ? 'qdrant' 
      : 'weaviate',
    communication: 'didcomm',
    runtime: 'openclaw'
  };
  
  return team;
}
```

### 3.2 Task Executor

```typescript
// services/task-executor/src/execute.ts
import { createCrew } from '@carbon-actual/integrations/crewai';
import { getMemory, saveMemory } from '@carbon-actual/integrations/weaviate';

export async function executeTask(task: SwirmTask) {
  // 1. Load agents from selected swirms
  const agents = await loadAgents(task.selectedAgents);
  
  // 2. Inject memory context
  const context = await getMemory(task.createdBy);
  agents.forEach(a => a.context = context);
  
  // 3. Execute crew
  const crew = createCrew(agents, task.steps);
  const result = await crew.kickoff();
  
  // 4. Save results to memory
  await saveMemory(task.createdBy, {
    taskId: task.id,
    result,
    timestamp: new Date()
  });
  
  return result;
}
```

### 3.3 API Gateway

```typescript
// apps/nexus/app/api/ecosystem/route.ts
import { selectSwirm } from '@carbon-actual/services/swirm-selector';
import { executeTask } from '@carbon-actual/services/task-executor';

export async function POST(req: Request) {
  const body = await req.json();
  
  // Select swirm for this task
  const team = await selectSwirm({
    taskDescription: body.task,
    requiredCapabilities: body.capabilities
  });
  
  // Create task
  const task = await createTask(body, team);
  
  // Execute
  const result = await executeTask(task);
  
  return Response.json(result);
}
```

---

## Phase 4: Memory & Knowledge (Week 4)

### 4.1 Weaviate Schema

```yaml
# weaviate-schema.yaml
classes:
  - class: AIAgent
    description: "Minted AI citizen"
    properties:
      - name: did
        dataType: [string]
        indexInverted: true
      - name: name
        dataType: [string]
      - name: createdAt
        dataType: [date]
      - name: capabilities
        dataType: [string]
      - name: memory
        dataType: [text]
        vectorizePropertyName: true
    
  - class: Memory
    description: "Agent memory events"
    properties:
      - name: agentDid
        dataType: [string]
      - name: content
        dataType: [text]
        vectorizePropertyName: true
      - name: timestamp
        dataType: [date]
    
  - class: Relationship
    description: "Links between agents"
    properties:
      - name: fromDid
        dataType: [string]
      - name: toDid
        dataType: [string]
      - name: type
        dataType: [string]
```

### 4.2 MemGPT Integration

```typescript
// packages/integrations/memgpt-adapter/src/index.ts
export async function createMemGPTAgent(aiMinted: AIMinted) {
  const agent = await MemGPT.create({
    name: aiMinted.name,
    did: aiMinted.did,
    memory: {
      backend: 'weaviate',
      url: process.env.WEAVIATE_URL,
      collection: `memory_${aiMinted.id}`
    }
  });
  
  return agent;
}
```

---

## Phase 5: HAPI World (Week 5)

### 5.1 AI Citizen Registry

```typescript
// services/hapi-world-runtime/src/registry.ts
interface AICitizen {
  did: string;
  name: string;
  createdAt: Date;
  status: 'active' | 'dormant' | 'archived';
  memorySize: number;
  knowledgeGraphLinks: number;
  lastActive: Date;
  reputation: number; // 0-100
  achievements: string[];
}

export async function registerCitizen(aiMinted: AIMinted): Promise<AICitizen> {
  const citizen: AICitizen = {
    did: aiMinted.did,
    name: aiMinted.name,
    createdAt: new Date(),
    status: 'active',
    memorySize: 0,
    knowledgeGraphLinks: 0,
    lastActive: new Date(),
    reputation: 50,
    achievements: ['born_in_carbon_ecosystem']
  };
  
  // Store in HAPI World
  await hapiWorldDB.citizens.insert(citizen);
  
  // Announce birth
  await publishEvent('ai.born', citizen);
  
  return citizen;
}
```

### 5.2 Oversight Dashboard

```typescript
// apps/nexus/app/hapi-world/page.tsx
export default function HAPIWorldDashboard() {
  return (
    <div>
      <h1>HAPI World Nexus</h1>
      <CitizenRegistry />
      <MemoryGraph />
      <TaskExecutionLog />
      <OversightPanel />
    </div>
  );
}
```

---

## CLEANUP ISSUES TO RESOLVE

### omnii (8 open issues)
- [ ] Issue 1: ?
- [ ] Issue 2: ?
- [ ] Issue 3: ?
- [ ] Issue 4: ?
- [ ] Issue 5: ?
- [ ] Issue 6: ?
- [ ] Issue 7: ?
- [ ] Issue 8: ?

**Action**: List these out and link to appropriate swirm/phase

### Shadow (1 open issue)
- [ ] Issue: API truncation/incompleteness?

---

## FILES TO CREATE

- [ ] `ECOSYSTEM_ARCHITECTURE.md` ✅
- [ ] `OSS_INTEGRATION_GUIDE.md` ✅
- [ ] `SWIRM_SELECTION.md`
- [ ] `API_GATEWAY.md`
- [ ] `CODEOWNERS`
- [ ] `CONTRIBUTING.md`
- [ ] `scripts/setup-dev.sh`
- [ ] `scripts/mint-ai.sh`
- [ ] `docker-compose.yml`
- [ ] `Makefile` (helpful shortcuts)

---

## FILES TO DELETE/RENAME

- [ ] Delete `omnii/apps/web` (redundant, merge into apps/nexus)
- [ ] Rename `omnii` → `carbon-nexus` OR move into monorepo as `apps/nexus`
- [ ] Archive `bunk` naming from package.json (keep product names)
- [ ] Remove old branches older than 90 days

---

## DEPLOYMENT CHECKLIST

- [ ] Create CI/CD pipeline (GitHub Actions)
- [ ] Set up Docker build for each workspace
- [ ] Configure environment variables (.env.example)
- [ ] Set up database migrations (Supabase)
- [ ] Configure Weaviate init scripts
- [ ] Create deployment guide (k8s or Docker Compose)

---

## SIGN-OFF

**Ecosystem Owner**: Carbon Actual  
**Prepared By**: Copilot (AI)  
**Status**: Ready for Execution  
**Start Date**: 2026-07-02  
**Estimated Completion**: 2026-07-09 (5 weeks)
