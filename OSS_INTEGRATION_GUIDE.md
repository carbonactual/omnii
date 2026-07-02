# 🔗 INTEGRATION GUIDE: OSS Tools & Carbon Actual

## Overview
This guide maps open-source AI/Agent tools to Carbon Actual's swirms. Integration follows a **plugin architecture**—each tool is optional but composable.

---

## 1. AGENT ORCHESTRATION SWIRM

### CrewAI Integration
**What**: Role-based multi-agent orchestration framework
**Why**: Perfect for task-specific team assembly
**Integration Point**: omnii (nexus hub)

```yaml
Installation:
  pip install crewai

Usage:
  # Define agents by role
  researcher = Agent(role="Researcher", ...)
  analyst = Agent(role="Analyst", ...)
  
  # Assemble task-specific team
  team = Crew(agents=[researcher, analyst], tasks=[...])
  result = team.kickoff()
```

**Carbon Use**: Each task triggers SwirmSelector → picks agents → CrewAI executes

---

### LangGraph Integration
**What**: Graph-based workflow orchestration
**Why**: Visual, stateful, persistent workflows
**Integration Point**: omnii orchestration

```yaml
Installation:
  pip install langgraph

Usage:
  graph = StateGraph(State)
  graph.add_node("agent_1", agent_1_fn)
  graph.add_edge("agent_1", "agent_2")
  compiled = graph.compile()
```

**Carbon Use**: Complex multi-step tasks → LangGraph for state persistence

---

## 2. MINTING & IDENTITY SWIRM

### Hyperledger Aries Integration
**What**: Decentralized identifier (DID) and verifiable credential framework
**Why**: Soul-binding for minted AIs, cryptographic identity
**Integration Point**: abba-mas (minting system)

```yaml
Installation:
  pip install aries-cloudagent

Usage:
  # 1. Create DID for new AI
  did = await agent.wallet.create_did()
  
  # 2. Issue VC (AI credential)
  credential = await issuer.issue_credential(
    did=did,
    attributes={
      "ai_name": "alice_001",
      "created_at": "2026-07-02",
      "capabilities": ["nlp", "reasoning"]
    }
  )
  
  # 3. Store in agent wallet
  await agent.store_credential(credential)
```

**Carbon Use**: User signup → Auto-create DID → Mint AI twin with VC → Store in HAPI World registry

---

### Veramo Integration (Alternative)
**What**: JavaScript/TypeScript DID and VC toolkit
**Why**: TypeScript-native for abba-mas, browser-ready
**Integration Point**: Shadow (identity layer)

```yaml
Installation:
  npm install @veramo/core @veramo/did-manager

Usage:
  const did = await agent.didManager.create({
    provider: 'did:key',
  })
```

---

## 3. MEMORY & KNOWLEDGE SWIRM

### Weaviate Integration
**What**: Vector database + knowledge graph engine
**Why**: Persistent AI consciousness, relationship mapping
**Integration Point**: HAPI World state layer

```yaml
Installation:
  docker run -p 8080:8080 semitechnologies/weaviate:latest

Usage:
  # Connect to omnii
  import weaviate
  client = weaviate.Client("http://localhost:8080")
  
  # Create AI agent object
  client.data_object.create(
    class_name="AIAgent",
    data_object={
      "name": "alice_001",
      "did": "did:key:z6...",
      "memory": [...],
      "relationships": [...]
    }
  )
```

**Carbon Use**: Every interaction compounds in Weaviate → Persistent AI memory grows over time

---

### MemGPT Integration
**What**: Extended context memory system for agents
**Why**: Agents remember beyond token limit
**Integration Point**: openclaw (persistent chat)

```yaml
Installation:
  pip install memgpt

Usage:
  agent = MemGPT.create_agent(
    name="alice",
    memory_type="weaviate",
    weaviate_endpoint="http://localhost:8080"
  )
  
  response = agent.message("Tell me about yourself")
  # Agent recalls previous conversations automatically
```

---

### Qdrant Integration (Lightweight Alt)
**What**: Lightweight vector DB
**Why**: Minimal dependencies, fast embeddings
**Integration Point**: openclaw edge deployment

```yaml
Installation:
  pip install qdrant-client

Usage:
  from qdrant_client import QdrantClient
  client = QdrantClient("localhost:6333")
  
  client.upsert(
    collection_name="ai_memories",
    points=[Point(id=1, vector=[...], payload={...})]
  )
```

---

## 4. USER-FACING INTERFACES SWIRM

### OpenClaw Integration (Already Using)
**What**: Multi-channel AI assistant platform
**Why**: Already in your stack, multi-OS deployment
**Integration Point**: Frontend for all swirms

**Current Status**: Fork maintained, plugin-based
**Next**: Integrate with Weaviate for memory backend

```typescript
// In openclaw extensions/
export const setupMemoryBackend = async () => {
  const weaviate = new WeaviateClient("http://nexus:8080");
  return {
    getMemory: (did: string) => weaviate.get(did),
    saveMemory: (did: string, data: any) => weaviate.upsert(did, data)
  }
}
```

---

### Shadow Integration
**What**: Identity-bound AI ownership platform
**Why**: Legal verification of AI ownership
**Integration Point**: Bind to minted AI credentials

**Next**: Connect Shadow to Aries DID system

```typescript
// Shadow API enhancement
POST /api/ai/mint
Body: {
  owner_did: "did:key:...",
  ai_name: "alice",
  lawful_use_cases: [...]
}

Response: {
  ai_did: "did:key:...",
  vc_credential: "...",
  ownership_proof: "..."
}
```

---

## 5. COMMUNICATION SWIRM

### DIDComm Protocol
**What**: Agent-to-agent secure messaging
**Why**: Agents talk autonomously, cryptographically verified
**Integration Point**: omnii message router

```yaml
Implementation:
  # Built into Aries
  # Enable in agent config:
  "didcomm": {
    "enabled": true,
    "protocols": ["1.0"]
  }
```

**Carbon Use**: When CrewAI assembles a team, agents communicate via DIDComm → No human in loop

---

### NATS.io (Message Broker)
**What**: High-performance message queue
**Why**: Fast, reliable agent-to-agent pub/sub
**Integration Point**: omnii event bus

```yaml
Installation:
  docker run -p 4222:4222 nats:latest

Usage (Node):
  const nats = require('nats');
  const nc = await nats.connect();
  
  // Agent 1 publishes
  nc.publish('ai.task.completed', 'result_data');
  
  // Agent 2 subscribes
  const sub = nc.subscribe('ai.task.completed');
  for await (const msg of sub) {
    console.log(msg.data);
  }
```

---

## 6. MODEL & LLM RUNTIME SWIRM

### Local Inference (Ollama)
**What**: Run LLMs locally, any OS
**Why**: Privacy, no API dependency
**Integration Point**: openclaw runtime

```yaml
Installation:
  brew install ollama (macOS)
  # Or download from ollama.com

Usage:
  ollama pull llama2
  ollama serve
  
  # Then in code:
  response = requests.post(
    'http://localhost:11434/api/generate',
    json={'model': 'llama2', 'prompt': 'Hello'}
  )
```

---

### vLLM (High-Throughput)
**What**: Optimized LLM serving
**Why**: 10x faster inference
**Integration Point**: omnii agent backend

```yaml
Installation:
  pip install vllm

Usage:
  from vllm import LLM
  llm = LLM(model="meta-llama/Llama-2-7b")
  output = llm.generate("Hello")[0]
```

---

## INTEGRATION ARCHITECTURE DIAGRAM

```
┌──────────────────────────────────────────────────────────────┐
│                      OMNII (Nexus Hub)                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Task Router → SwirmSelector → ExecutionEngine        │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    ┌────────┐    ┌────────┐    ┌────────┐    ┌─────────┐
    │ CrewAI │    │Aries DID│    │Weaviate│    │OpenClaw │
    │LangGraph   │Veramo   │    │MemGPT  │    │Ollama   │
    └────────┘    └────────┘    └────────┘    └─────────┘
         │              │              │              │
         └──────────────┴──────────────┴──────────────┘
                  DIDComm + NATS.io Message Bus
```

---

## DEPLOYMENT ARCHITECTURE

### Local (Development)
```yaml
Services:
  omnii: localhost:3000 (Next.js)
  aries-agent: localhost:8020 (Python)
  weaviate: localhost:8080
  ollama: localhost:11434
  nats: localhost:4222
```

### Production (Self-Hosted)
```yaml
K8s Cluster:
  omnii-pod: Central orchestration
  aries-pod: Identity service
  weaviate-pod: Knowledge/memory
  vllm-pod: Model inference
  nats-pod: Message broker
  
Storage:
  PostgreSQL: App state
  S3: Model weights
  IPFS: Distributed registry
```

---

## QUICK START: Spinning Up One Swirm

### Example: Memory Swirm
```bash
# 1. Start Weaviate
docker run -p 8080:8080 semitechnologies/weaviate:latest

# 2. Add to omnii/.env
WEAVIATE_URL=http://localhost:8080
ARIES_URL=http://localhost:8020

# 3. Create integration module
cat > omnii/lib/integrations/weaviate.ts << 'EOF'
import weaviate from 'weaviate-ts-client';

export const memoryClient = weaviate.client({
  scheme: 'http',
  host: process.env.WEAVIATE_URL,
});

export const storeMemory = async (did: string, data: any) => {
  return memoryClient.data.creator()
    .withClassName('AIMemory')
    .withObj({did, ...data})
    .do();
};
EOF

# 4. Test
npm run dev
# Visit http://localhost:3000/api/test/memory
```

---

## MAINTENANCE & VERSIONING

| Tool | Latest | Update Freq | Carbon Pin |
|------|--------|------------|-----------|
| CrewAI | 0.45.0 | Weekly | ^0.45.0 |
| LangGraph | 0.2.0 | Bi-weekly | ^0.2.0 |
| Aries | 0.11.0 | Monthly | ^0.11.0 |
| Weaviate | 1.7.0 | Monthly | ^1.7.0 |
| MemGPT | 0.4.0 | Weekly | ^0.4.0 |
| Qdrant | 1.10.0 | Monthly | ^1.10.0 |

---

**Status**: Ready for integration  
**Owner**: Carbon Actual Engineering  
**Last Updated**: 2026-07-02
