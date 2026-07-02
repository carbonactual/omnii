# Contributing to Carbon Actual Ecosystem

## Welcome 🤝

This is a mission to build the future of human-AI coexistence. Every contribution matters, whether code, documentation, ideas, or feedback.

---

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git
- GitHub account

### Setup
```bash
# Clone the monorepo
git clone https://github.com/carbon-actual/ecosystem.git
cd ecosystem

# Install dependencies
npm install

# Setup development environment
npm run setup

# Start all services
npm run dev
```

### Verify Setup
```bash
# Run tests
npm run test

# Check types
npm run typecheck

# Lint code
npm run lint
```

---

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/swirm-xyz-integration
# or
git checkout -b fix/issue-123
```

### 2. Make Changes
- Follow TypeScript strict mode
- Add tests for new functionality
- Update documentation
- Run `npm run lint` before committing

### 3. Commit with Clear Messages
```bash
# Format: type(scope): description
git commit -m "feat(swirm-selector): add latency scoring"
git commit -m "fix(weaviate): handle null memory states"
git commit -m "docs: update integration guide"
```

### 4. Create Pull Request
- Link related issues: `Fixes #123`
- Describe changes clearly
- Request review from CODEOWNERS
- Ensure CI passes

### 5. Code Review & Merge
- Address feedback
- Rebase on main if needed
- Squash commits if requested
- Merge to main

---

## Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no functional change)
- `refactor`: Code restructuring
- `test`: Test additions/updates
- `chore`: Build/deps/tooling
- `perf`: Performance improvement

---

## Working with Swirms

### Adding a New Integration

```bash
# 1. Create adapter package
mkdir packages/integrations/my-tool-adapter
cd packages/integrations/my-tool-adapter
npm init -y

# 2. Add to root package.json workspaces
# (auto-detected by turbo)

# 3. Implement interface
cat > src/index.ts << 'EOF'
import { SwirmAdapter } from '@carbon-actual/types';

export class MyToolAdapter implements SwirmAdapter {
  async initialize() { /* ... */ }
  async execute(task: any) { /* ... */ }
  async getStatus() { /* ... */ }
}
EOF

# 4. Register in swirm-selector
echo 'my_tool_v1.0' >> services/swirm-selector/available-tools.txt

# 5. Add tests
npm run test
```

### Testing Swirms

```bash
# Test a specific swirm
npm run test -- --filter=crewai-adapter

# Integration test
npm run test:integration

# Test swirm selection logic
npm run test -- swirm-selector
```

---

## Documentation Standards

### README for New Packages
```markdown
# My Package

Brief description

## Installation
```

### Code Comments
```typescript
// Single-line for simple explanations

/**
 * Multi-line JSDoc for functions
 * @param input - Description
 * @returns Description of return value
 */
function myFunction(input: string): string {
  // Implementation
}
```

### Commit Documentation
- Reference related issues: `#123`
- Link PRs: `carbon-actual/ecosystem#456`
- Explain why, not what

---

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types unless documented
- Export interfaces, not implementations where possible
- Use discriminated unions over overloads

### Naming Conventions
```typescript
// Classes: PascalCase
class TaskExecutor { }

// Functions/variables: camelCase
function selectSwirm() { }
const maxLatency = 5000;

// Constants: UPPER_SNAKE_CASE
const MAX_TEAM_SIZE = 10;

// Interfaces: PascalCase with I prefix
interface ISwirmAdapter { }
```

### File Structure
```
packages/my-package/
├── src/
│   ├── index.ts          (public exports)
│   ├── types.ts          (interfaces)
│   ├── adapter.ts        (main implementation)
│   └── utils.ts          (helpers)
├── tests/
│   ├── adapter.test.ts
│   └── utils.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### End-to-End Tests
```bash
npm run test:e2e
```

### Coverage
```bash
npm run test:coverage
# Aim for >80% coverage
```

---

## Performance

- Swirm selection should be <100ms
- Task execution varies by swirm
- Memory queries should be <500ms
- API responses <1s (excluding async tasks)

---

## Security

- Never commit `.env` files
- Use `process.env` for secrets
- Validate all external inputs
- Review DIDs in code (don't leak in logs)
- Follow OWASP guidelines

---

## Questions?

- Check existing issues/PRs
- Ask in discussions
- Email: hello@carbonactual.ai
- Read the docs: `/docs`

---

## Code of Conduct

- Be respectful and inclusive
- Welcome different perspectives
- Report issues privately if sensitive
- Focus on the mission: balanced human-AI future

Thanks for building the future! 🚀
