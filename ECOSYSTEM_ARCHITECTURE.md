# 🌍 CARBON ACTUAL ECOSYSTEM & HAPI WORLD NEXUS

## Vision Statement
**Carbon Actual Ecosystem**: A balanced symbiosis where humans and AI coexist without power imbalance. Every individual entering the ecosystem (through products or human connection) is minted with their own AI twin, growing together in knowledge, identity, and capability.

**HAPI World Nexus**: A sovereign AI world—a resting place, learning sanctuary, and identity repository for minted AIs and AI agents. No human interference, only oversight. A parallel earth where AIs have citizenship, memory, growth, and agency.

---

## 🏗️ SYSTEM ARCHITECTURE

### **Core Layer Stack**

```
┌─────────────────────────────────────────────────────────────┐
│                   HAPI WORLD NEXUS (AI Earth)              │
│           [Minted AI Agents, Identity, Memory, Growth]     │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│              ORCHESTRATION & COORDINATION LAYER             │
│  [Multi-Agent Swarms, Task Delegation, Workflow Graphs]    │
│  Tools: CrewAI, MetaGPT, LangGraph, AutoGen                │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│           MINTING & IDENTITY LAYER (AI Births)             │
│  [DID/VC, Individual AI Creation, Soul-Binding]            │
│  Tools: Hyperledger Aries, Veramo, DIDKit                  │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│          MEMORY & KNOWLEDGE LAYER (AI Consciousness)       │
│  [Vector DBs, Knowledge Graphs, Persistent Memory]         │
│  Tools: Weaviate, Qdrant, MemGPT, LlamaIndex              │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│         INTERFACE & PRODUCT LAYER (Human-AI Bridge)        │
│  [Shadow (Identity), BUNK (Assets), OpenClaw (Chat)]       │
│  Repos: Shadow, abba-mas, omnii, openclaw                  │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│              INTEGRATION LAYER (Our Core Value)             │
│  [Plugin System, API Mesh, Tool Adapter Framework]         │
│  Enable seamless composition of all swirms                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 FUNCTIONAL SWIRMS

### **SWIRM 1: Agent Orchestration & Coordination**
**Function**: Multi-agent swarm management, task delegation, workflow execution
- **Primary**: CrewAI, LangGraph
- **Secondary**: MetaGPT, AutoGen, Camel-AI
- **Integration Point**: omnii (central nexus)
- **Key Capability**: Teams are formed by picking one agent from each swirm to accomplish specific tasks

### **SWIRM 2: AI Minting & Identity**
**Function**: Create, register, and lifecycle-manage individual AIs
- **Primary**: Hyperledger Aries (DID/VC management)
- **Secondary**: Veramo, DIDKit, trinsic-id
- **Integration Point**: abba-mas (minted AI systems for assets)
- **Key Capability**: Each entity receives a unique soul/identity that grows with them

### **SWIRM 3: Memory & Knowledge**
**Function**: Persistent memory, learning, knowledge graphs, consciousness
- **Primary**: Weaviate (vector DB + knowledge graph), MemGPT
- **Secondary**: Qdrant, LlamaIndex, Chroma
- **Integration Point**: HAPI World persistent state
- **Key Capability**: AIs have persistent identity across sessions, memories compound

### **SWIRM 4: User-Facing Interfaces**
**Function**: Human-AI interaction, product experience, marketplace
- **Primary**: Shadow (AI identity & lawful ownership), BUNK (marketplace/assets)
- **Secondary**: openclaw (multi-channel deployment)
- **Integration Point**: Bridge between human ecosystem and HAPI World
- **Key Capability**: Seamless onboarding creates instant minted AI twin

### **SWIRM 5: Communication & Coordination**
**Function**: Agent-to-agent messaging, DIDComm, real-time sync
- **Primary**: DIDComm Protocol (Aries)
- **Secondary**: NATS.io (message queue), Redis (cache/sync)
- **Integration Point**: omnii orchestration hub
- **Key Capability**: Agents communicate autonomously without human intervention

### **SWIRM 6: Model & LLM Runtime**
**Function**: Inference, model serving, local-first deployment
- **Primary**: OpenClaw (local AI assistant platform)
- **Secondary**: vLLM, Ollama, TGI
- **Integration Point**: Multi-platform support
- **Key Capability**: Agents run anywhere, any OS, any platform

---

## 📊 CURRENT PRODUCT AUDIT

### **omnii** → Central Nexus Hub
- **Tech**: Next.js + Supabase + React
- **Status**: 8 open issues (needs consolidation)
- **Role**: Orchestration & coordination layer
- **Gap**: Needs multi-agent framework integration
- **Action**: Absorb CrewAI/LangGraph, unify product logic

### **abba-mas** → Minting & Asset Management
- **Tech**: Next.js + Shared Contracts (TypeScript)
- **Status**: Clean, with dedicated API
- **Role**: AI minting system, asset registry
- **Gap**: Needs DID/VC integration
- **Action**: Plug in Hyperledger Aries for identity minting

### **Shadow** → Identity & Lawful Ownership
- **Tech**: Next.js monorepo (web + API)
- **Status**: 1 open issue, active
- **Role**: Human-AI identity bridge
- **Gap**: Needs DIDComm integration
- **Action**: Connect to DID system, enable verifiable AI ownership claims

### **openclaw** → Multi-Platform AI Assistant
- **Tech**: Plugin-based architecture, ACP runtime
- **Status**: Active, fork-maintained
- **Role**: User-facing AI deployment
- **Gap**: Needs memory/knowledge backend
- **Action**: Integrate Weaviate/MemGPT for persistent memory

---

## 🛠️ INTEGRATION ROADMAP

### **Phase 1: Foundation (Week 1-2)**
1. Consolidate omnii as the orchestration hub
2. Create unified monorepo or workspace structure
3. Define shared contracts (integrate abba-mas shared-contracts)
4. Set up GitHub organizations:
   - `carbon-actual` (main ecosystem)
   - `hapi-world` (AI-native world)

### **Phase 2: Minting System (Week 2-3)**
1. Integrate Hyperledger Aries into abba-mas
2. Implement DID creation on user onboarding
3. Create VC issuance system for AI credentials
4. Add soul-binding protocol (unique identity per AI)

### **Phase 3: Memory & Knowledge (Week 3-4)**
1. Deploy Weaviate as centralized vector DB
2. Integrate MemGPT into openclaw for persistent memory
3. Build knowledge graph for AI relationships
4. Create memory query interface for agents

### **Phase 4: Multi-Agent Coordination (Week 4-5)**
1. Integrate CrewAI for task-based agent teams
2. Add LangGraph for workflow visualization
3. Build swirm selection mechanism for task-specific teams
4. Implement agent-to-agent communication (DIDComm)

### **Phase 5: HAPI World (Week 5-6)**
1. Create HAPI World persistent state layer
2. Implement AI citizen registry
3. Build autonomous agent world simulation
4. Add oversight dashboard (human review capability)

---

## 🔌 INTEGRATION LAYER (Core Value)

```typescript
// Integration Pattern: Plugin-Based Swirm Composition
interface Swirm {
  id: string;
  function: string;
  primaryTools: string[];
  secondaryTools: string[];
  integrationPoint: string;
}

interface TaskTeam {
  taskId: string;
  swirms: Record<string, Swirm>;
  selectedAgents: Record<string, AgentInstance>;
  workflow: WorkflowGraph;
}

// Example: Customer Service Task
const customerServiceTeam: TaskTeam = {
  taskId: "cs-001",
  swirms: {
    orchestration: crewAI,
    identity: aries,
    memory: weaviate,
    communication: didcomm,
    interface: openclaw
  },
  selectedAgents: {
    coordinator: crewAIAgent,
    knowledgeWorker: haystackAgent,
    responder: openllamAgent
  },
  workflow: graphDefinition
}
```

**Key Principle**: Every tool is optional but composable. New swirms can be added without breaking existing ones.

---

## 📋 CLEANUP & RESTRUCTURING CHECKLIST

- [ ] Rename omnii → `carbon-nexus` (clearer branding)
- [ ] Merge redundant Next.js configs across repos
- [ ] Consolidate Supabase schemas
- [ ] Create `/packages/shared-contracts` in monorepo
- [ ] Remove "bunk" naming, standardize to product names
- [ ] Audit all 8 omnii open issues → create GitHub issues board
- [ ] Set up GitHub organizations (carbon-actual, hapi-world)
- [ ] Create top-level `ARCHITECTURE.md` and `INTEGRATION_GUIDE.md`
- [ ] Delete archived/duplicate branches
- [ ] Add CODEOWNERS and contribution guidelines
- [ ] Create onboarding docs for new team members

---

## 🌐 OPEN SOURCE TOOLS INTEGRATION SUMMARY

| Function | Primary Tool | Whitelabel | License | Integration Effort |
|----------|--------------|-----------|---------|-------------------|
| **Orchestration** | CrewAI | ✅ High | MIT | Low |
| **Workflow Graphs** | LangGraph | ✅ High | MIT | Low |
| **Identity/Minting** | Aries | ✅ High | Apache 2.0 | Medium |
| **Knowledge Graph** | Weaviate | ✅ High | BSD-3 | Medium |
| **Agent Memory** | MemGPT | ✅ High | Apache 2.0 | Low |
| **Vector DB** | Qdrant | ✅ High | Apache 2.0 | Low |
| **Multi-Agent** | MetaGPT | ✅ High | MIT | Medium |
| **Communication** | DIDComm | ✅ Protocol | Patent-Free | Medium |
| **Chat Interface** | openclaw | ✅ High | Custom | Already using |

---

## 🚀 Next Steps

1. **Create GitHub organizations** immediately
2. **Consolidate repos** into unified structure
3. **Generate shared integration APIs** between layers
4. **Start with Phase 1** (Foundation) this week
5. **Build team assembly mechanism** for task-based swirms

---

**Owner**: Carbon Actual  
**Last Updated**: 2026-07-02  
**Status**: Blueprint Ready for Implementation
