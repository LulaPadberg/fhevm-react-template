# Universal FHEVM SDK

> A framework-agnostic SDK for building confidential frontends with Fully Homomorphic Encryption (FHE)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![FHEVM](https://img.shields.io/badge/FHEVM-Zama-purple)](https://docs.zama.ai/fhevm)

## 🏆 Bounty Program

**GitHub Repository**: [https://github.com/LulaPadberg/fhevm-react-template](https://github.com/LulaPadberg/fhevm-react-template)

**Live Example Application**: [https://fhe-vehicle-insurance.vercel.app/](https://fhe-vehicle-insurance.vercel.app/)

**Example Smart Contract**: `0x2A86c562acc0a861A96E4114d7323987e313795F` (Sepolia Testnet)

**Demo Video**: Download `demo.mp4` to watch the complete platform demonstration showcasing FHE vehicle insurance claims processing with full privacy protection.

## 🚀 Quick Start (< 10 lines!)

\`\`\`bash
# Install the SDK
npm install @fhevm/universal-sdk

# Initialize in your React app
import { useFhevmClient, useEncrypt } from '@fhevm/universal-sdk/react';

const { client } = useFhevmClient({ network: { chainId: 8009, rpcUrl: 'https://devnet.zama.ai', name: 'Zama Devnet' } });
const { encryptValue } = useEncrypt();

# Encrypt and use!
const encrypted = await encryptValue('uint32', 12345);
\`\`\`

## ✨ Features

- **🎯 Framework-Agnostic** - Works with React, Vue, Node.js, or any JavaScript environment
- **📦 All-in-One** - Single package wrapping all FHEVM dependencies
- **🔗 Wagmi-like API** - Familiar interface for web3 developers
- **⚡ Quick Setup** - Less than 10 lines of code to get started
- **🔐 Type-Safe** - Full TypeScript support with intelligent type inference
- **🪝 React Hooks** - Built-in hooks for React applications
- **🎨 Zero Configuration** - Sensible defaults that just work
- **📚 Well Documented** - Comprehensive docs with examples

