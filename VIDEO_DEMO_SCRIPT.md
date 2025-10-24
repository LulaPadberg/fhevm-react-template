# Video Demo Script for Universal FHEVM SDK

## Duration: 3-5 minutes

## Opening (0:00 - 0:30)

**Visual:** Title slide with SDK logo

**Narration:**
"Hi! Today I'm excited to show you the Universal FHEVM SDK - a framework-agnostic toolkit that makes building confidential frontends with Fully Homomorphic Encryption incredibly simple."

**On-screen text:**
- Universal FHEVM SDK
- Framework-Agnostic • Type-Safe • Developer-Friendly

---

## Problem Statement (0:30 - 1:00)

**Visual:** Side-by-side code comparison

**Narration:**
"Before this SDK, integrating FHEVM required managing multiple packages, complex initialization code, and framework-specific implementations. It took dozens of lines of boilerplate just to get started."

**On-screen:** Show complex old code with multiple imports

```typescript
// Before: Complex setup
npm install fhevmjs @zama-fhe/oracle-solidity ethers
// 30+ lines of initialization code...
```

---

## Solution (1:00 - 1:30)

**Visual:** New SDK code - clean and simple

**Narration:**
"With the Universal FHEVM SDK, everything is simplified. One package, one import, less than 10 lines of code to get started."

**On-screen:**
```typescript
// After: Simple setup
npm install @fhevm/universal-sdk

const { client } = useFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama'
  }
});
```

---

## Key Features (1:30 - 2:00)

**Visual:** Feature bullets animating in

**Narration:**
"The SDK is truly framework-agnostic - use it with React, Vue, Next.js, or even vanilla JavaScript. It provides wagmi-like hooks for React developers, making the API feel familiar and intuitive."

**On-screen text:**
✅ Framework-Agnostic (React, Vue, Node.js)
✅ Wagmi-like API
✅ Type-Safe TypeScript
✅ < 10 Lines to Get Started
✅ All-in-One Package

---

## Live Demo - React Example (2:00 - 3:00)

**Visual:** Screen recording of Next.js showcase app

**Narration:**
"Let me show you how easy it is. Here's a React application using the SDK."

**Actions:**
1. Open browser showing the Next.js showcase
2. Show FHEVM Client status (green indicator - Ready)
3. Enter a number: 12345
4. Click "Encrypt" button
5. Show encrypted result (hex string)

**Narration:**
"The SDK handles initialization automatically. I can encrypt values with just one hook call. The encrypted data is ready to be sent to smart contracts for confidential computation."

**Code overlay:**
```typescript
const { encryptValue } = useEncrypt();
const encrypted = await encryptValue('uint32', 12345);
```

---

## Architecture (3:00 - 3:30)

**Visual:** Architecture diagram

**Narration:**
"The SDK architecture is clean and modular. The core is framework-agnostic, with optional React hooks on top. This means you can use the same SDK across your entire stack."

**On-screen diagram:**
```
@fhevm/universal-sdk
├── Core (Framework-Agnostic)
│   ├── Client Management
│   ├── Encryption
│   └── Decryption
└── React Integration
    ├── useFhevmClient
    ├── useEncrypt
    └── useDecrypt
```

---

## Real-World Example (3:30 - 4:00)

**Visual:** Insurance dapp example

**Narration:**
"We've included a real-world insurance platform example that demonstrates the SDK in production. It shows private vehicle insurance with encrypted claims processing - all data remains confidential on-chain."

**Show:**
- Insurance dapp contracts
- Frontend integration
- Test results

---

## Installation & Setup (4:00 - 4:30)

**Visual:** Terminal/IDE showing installation

**Narration:**
"Getting started is incredibly simple. Install the package, initialize the client, and you're ready to encrypt and decrypt."

**Terminal commands:**
```bash
npm install @fhevm/universal-sdk
```

**Code editor:**
```typescript
import { useFhevmClient, useEncrypt } from '@fhevm/universal-sdk/react';

// 3 lines to get started!
const { client } = useFhevmClient(config);
const { encryptValue } = useEncrypt();
const encrypted = await encryptValue('uint32', value);
```

---

## Documentation & Resources (4:30 - 4:50)

**Visual:** Documentation site / README

**Narration:**
"The SDK comes with comprehensive documentation, including a getting started guide, complete API reference, and multiple examples for different frameworks."

**Show:**
- README.md highlights
- docs/ folder structure
- examples/ folder

**On-screen:**
- 📚 Complete Documentation
- 🎯 Multiple Examples (React, Vue, Node.js)
- 💡 Best Practices Guide
- 🚀 Production-Ready Insurance Dapp

---

## Closing (4:50 - 5:00)

**Visual:** GitHub repo / Call to action

**Narration:**
"The Universal FHEVM SDK makes confidential computing accessible to every web3 developer. Check out the repository, try the examples, and start building privacy-preserving applications today!"

**On-screen text:**
- GitHub: [repo link]
- Documentation: [docs link]
- Live Demo: [deployed link]
- Built with ❤️ for the FHE community

---

## Recording Notes

### Tools Needed:
- Screen recording software (OBS Studio, Loom, or QuickTime)
- Code editor with syntax highlighting
- Browser with Next.js showcase running
- Terminal window

### Recording Tips:
1. Use 1080p or higher resolution
2. Enable code syntax highlighting
3. Use large, readable fonts (16px+)
4. Keep cursor movements smooth
5. Add subtle background music (optional)
6. Use zoom/highlight for important code sections

### Post-Production:
1. Add captions for accessibility
2. Include timestamps in description
3. Add chapter markers
4. Export in MP4 format (H.264 codec)
5. Optimize for YouTube/web

### File Export:
- Format: MP4
- Resolution: 1080p (1920x1080)
- Frame rate: 30fps or 60fps
- Bitrate: 5-10 Mbps
- File name: `demo.mp4`
