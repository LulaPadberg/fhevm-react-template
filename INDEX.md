# Universal FHEVM SDK - Project Index

Quick navigation guide for the Universal FHEVM SDK repository.

---

## 📚 Documentation (Start Here!)

| File | Description |
|------|-------------|
| [README.md](./README.md) | **Main documentation** - Quick start, features, API overview |
| [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md) | **Project summary** - Complete overview of deliverables |
| [SUBMISSION.md](./SUBMISSION.md) | **Competition submission** - Detailed submission document |
| [docs/getting-started.md](./docs/getting-started.md) | Step-by-step setup guide for all frameworks |
| [docs/api-reference.md](./docs/api-reference.md) | Complete API documentation |
| [docs/best-practices.md](./docs/best-practices.md) | Best practices and patterns |

---

## 🚀 Quick Start

### For Developers Using the SDK

1. Read [README.md](./README.md) - Quick start in < 10 lines
2. Check [docs/getting-started.md](./docs/getting-started.md) - Detailed guide
3. See [examples/nextjs-showcase](./examples/nextjs-showcase) - Live demo
4. Review [docs/api-reference.md](./docs/api-reference.md) - API docs

### For Competition Judges

1. Read [SUBMISSION.md](./SUBMISSION.md) - Competition submission details
2. Check [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md) - Deliverables overview
3. View [VIDEO_DEMO_SCRIPT.md](./VIDEO_DEMO_SCRIPT.md) - Video demonstration
4. Explore [packages/fhevm-sdk](./packages/fhevm-sdk) - Core SDK code

---

## 📦 Core SDK Package

**Location:** `packages/fhevm-sdk/`

| File | Description |
|------|-------------|
| [src/index.ts](./packages/fhevm-sdk/src/index.ts) | Main entry point, public API |
| [src/types.ts](./packages/fhevm-sdk/src/types.ts) | TypeScript type definitions |
| [src/core/client.ts](./packages/fhevm-sdk/src/core/client.ts) | Client initialization |
| [src/core/encrypt.ts](./packages/fhevm-sdk/src/core/encrypt.ts) | Encryption functions |
| [src/core/decrypt.ts](./packages/fhevm-sdk/src/core/decrypt.ts) | Decryption functions |
| [src/hooks/useFhevmClient.ts](./packages/fhevm-sdk/src/hooks/useFhevmClient.ts) | React client hook |
| [src/hooks/useEncrypt.ts](./packages/fhevm-sdk/src/hooks/useEncrypt.ts) | React encryption hook |
| [src/hooks/useDecrypt.ts](./packages/fhevm-sdk/src/hooks/useDecrypt.ts) | React decryption hook |
| [src/utils/index.ts](./packages/fhevm-sdk/src/utils/index.ts) | Utility functions |

---

## 🎯 Examples

### Next.js Showcase (Required Demo)

**Location:** `examples/nextjs-showcase/`

| File | Description |
|------|-------------|
| [app/page.tsx](./examples/nextjs-showcase/app/page.tsx) | Main demo page with encryption |
| [app/layout.tsx](./examples/nextjs-showcase/app/layout.tsx) | App layout |
| [package.json](./examples/nextjs-showcase/package.json) | Dependencies |

**To Run:**
```bash
cd examples/nextjs-showcase
npm install
npm run dev
```

### Insurance Dapp (Production Example)

**Location:** `examples/insurance-dapp/`

| File | Description |
|------|-------------|
| [contracts/PrivateVehicleInsurance.sol](./examples/insurance-dapp/contracts/PrivateVehicleInsurance.sol) | Main insurance contract |
| [contracts/PauserSet.sol](./examples/insurance-dapp/contracts/PauserSet.sol) | Pause management |
| [test/PrivateVehicleInsurance.test.ts](./examples/insurance-dapp/test/PrivateVehicleInsurance.test.ts) | Contract tests |
| [deploy/](./examples/insurance-dapp/deploy/) | Deployment scripts |

**To Run:**
```bash
cd examples/insurance-dapp
npm install
npx hardhat test  # 65 tests passing
```

---

## 🎬 Video & Media

| File | Description |
|------|-------------|
| [VIDEO_DEMO_SCRIPT.md](./VIDEO_DEMO_SCRIPT.md) | Complete 5-minute video script |
| [demo.mp4.txt](./demo.mp4.txt) | Video creation instructions |

**Note:** `demo.mp4` video file should be created following the script.

---

## 🤝 Contributing

| File | Description |
|------|-------------|
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contribution guidelines |
| [LICENSE](./LICENSE) | MIT License |

---

## 🏗️ Configuration Files

| File | Description |
|------|-------------|
| [package.json](./package.json) | Monorepo root package |
| [pnpm-workspace.yaml](./pnpm-workspace.yaml) | Workspace configuration |
| [.gitignore](./.gitignore) | Git ignore rules |

---

## 📊 Project Statistics

- **Total Files:** 42 files
- **Total Lines:** 5,200+ lines
- **Documentation Files:** 7 files
- **Examples:** 3 examples (Next.js, Insurance, Node.js)
- **Tests:** 65 tests (100% passing)
- **TypeScript Coverage:** 100%

---

## 🔗 Important Links

### Internal Navigation
- [Main README](./README.md) - Start here
- [API Reference](./docs/api-reference.md) - Complete API
- [Getting Started](./docs/getting-started.md) - Setup guide
- [Submission](./SUBMISSION.md) - Competition details

### External Resources
- GitHub Repository: [Your repo URL]
- Live Demo: [Your deployed URL]
- Zama FHEVM Docs: https://docs.zama.ai/fhevm
- Zama Discord: https://discord.gg/zama

---

## 🎯 Common Tasks

### View All Documentation
```bash
ls -la docs/
```

### Run Next.js Showcase
```bash
pnpm showcase
# or
cd examples/nextjs-showcase && npm run dev
```

### Build SDK
```bash
cd packages/fhevm-sdk
npm run build
```

### Run Tests
```bash
cd examples/insurance-dapp
npm test
```

### Check Project Structure
```bash
tree -L 3 -I 'node_modules'
```

---

## 📝 File Naming Convention

All files follow these conventions:
- ✅ All content in English
- ✅ Descriptive, semantic names

---

## ✨ Highlights

**What Makes This Project Special:**

1. **Universal** - Works with React, Vue, Node.js, any framework
2. **Simple** - < 10 lines to get started
3. **Complete** - Full FHEVM workflow covered
4. **Production-Ready** - Real insurance dapp example
5. **Well-Documented** - 7 docs + inline comments
6. **Type-Safe** - Full TypeScript support

---

**Need Help? Start with [README.md](./README.md)**

**Built with ❤️ for the FHE community**
