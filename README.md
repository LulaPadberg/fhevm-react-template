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

```bash
# Install the SDK
npm install @fhevm/universal-sdk

# Initialize in your React app
import { useFhevmClient, useEncrypt } from '@fhevm/universal-sdk/react';

const { client } = useFhevmClient({ network: { chainId: 8009, rpcUrl: 'https://devnet.zama.ai', name: 'Zama Devnet' } });
const { encryptValue } = useEncrypt();

// Encrypt and use!
const encrypted = await encryptValue('uint32', 12345);
```

## ✨ Features

- **🎯 Framework-Agnostic** - Works with React, Vue, Node.js, or any JavaScript environment
- **📦 All-in-One** - Single package wrapping all FHEVM dependencies
- **🔗 Wagmi-like API** - Familiar interface for web3 developers
- **⚡ Quick Setup** - Less than 10 lines of code to get started
- **🔐 Type-Safe** - Full TypeScript support with intelligent type inference
- **🪝 React Hooks** - Built-in hooks for React applications
- **🎨 Zero Configuration** - Sensible defaults that just work
- **📚 Well Documented** - Comprehensive docs with examples

## 📦 Installation

```bash
npm install @fhevm/universal-sdk

# Or with yarn
yarn add @fhevm/universal-sdk

# Or with pnpm
pnpm add @fhevm/universal-sdk
```

## 🎯 Why This SDK?

### Before (Complex Setup)

```typescript
// Install multiple packages
npm install fhevmjs @zama-fhe/oracle-solidity ethers

// Complex initialization
import { createInstance } from 'fhevmjs';
const provider = new BrowserProvider(window.ethereum);
const network = await provider.getNetwork();
const publicKeyResponse = await fetch('...');
const instance = await createInstance({ chainId, publicKey });
// ...many more lines
```

### After (Universal SDK)

```typescript
// Install one package
npm install @fhevm/universal-sdk

// Simple initialization
import { useFhevmClient } from '@fhevm/universal-sdk/react';

const { client } = useFhevmClient({
  network: { chainId: 8009, rpcUrl: 'https://devnet.zama.ai', name: 'Zama' }
});
```

## 🛠️ Usage

### React Example

```typescript
'use client';

import { useFhevmClient, useEncrypt, useDecrypt } from '@fhevm/universal-sdk/react';

export default function App() {
  // Initialize FHEVM
  const { client, isReady } = useFhevmClient({
    network: {
      chainId: 8009,
      rpcUrl: 'https://devnet.zama.ai',
      name: 'Zama Devnet'
    }
  });

  // Encryption
  const { encryptValue, isEncrypting } = useEncrypt({
    onSuccess: (data) => console.log('Encrypted!', data)
  });

  // Decryption
  const { decryptValue, result } = useDecrypt({
    onSuccess: (result) => console.log('Decrypted:', result.value)
  });

  // Use it
  const handleEncrypt = async () => {
    const encrypted = await encryptValue('uint32', 12345);
    // Send encrypted data to your smart contract
  };

  const handleDecrypt = async () => {
    await decryptValue({
      contractAddress: '0x...',
      handle: '0x...'
    });
  };

  if (!isReady) return <div>Loading FHEVM...</div>;

  return (
    <div>
      <button onClick={handleEncrypt} disabled={isEncrypting}>
        Encrypt
      </button>
      <button onClick={handleDecrypt}>
        Decrypt
      </button>
      {result && <p>Result: {result.value.toString()}</p>}
    </div>
  );
}
```

### Node.js / Framework-Agnostic Example

```typescript
import { createFhevmClient, encrypt, decrypt } from '@fhevm/universal-sdk';

// Initialize client
const client = await createFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  }
});

// Encrypt
const encryptedValue = await encrypt('uint32', 12345);

// Decrypt
const result = await decrypt({
  contractAddress: '0x...',
  handle: '0x...'
});

console.log('Decrypted value:', result.value);
```

### Vue Example

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { createFhevmClient, encrypt } from '@fhevm/universal-sdk';

const isReady = ref(false);
const encryptedData = ref(null);

onMounted(async () => {
  await createFhevmClient({
    network: {
      chainId: 8009,
      rpcUrl: 'https://devnet.zama.ai',
      name: 'Zama Devnet'
    }
  });
  isReady.value = true;
});

async function handleEncrypt() {
  encryptedData.value = await encrypt('uint32', 12345);
}
</script>

<template>
  <div v-if="isReady">
    <button @click="handleEncrypt">Encrypt</button>
  </div>
</template>
```

## 📖 API Reference

### Core Functions

#### `createFhevmClient(config)`

Initialize the FHEVM client.

```typescript
const client = await createFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  },
  gateway: {
    url: 'https://gateway.zama.ai/decrypt', // optional
    relayerAddress: '0x...' // optional
  },
  aclAddress: '0x...' // optional
});
```

#### `encrypt(type, value)`

Encrypt a value with automatic type handling.

```typescript
// Supported types: 'bool', 'uint8', 'uint16', 'uint32', 'uint64', 'address'
const encrypted = await encrypt('uint32', 12345);
const encryptedBool = await encrypt('bool', true);
const encryptedAddr = await encrypt('address', '0x...');
```

#### `decrypt(request)`

Decrypt an encrypted value.

```typescript
const result = await decrypt({
  contractAddress: '0x...',
  handle: '0x...'
});
console.log(result.value); // bigint
```

### React Hooks

#### `useFhevmClient(config)`

Hook for initializing and managing the FHEVM client.

```typescript
const { client, isLoading, error, isReady } = useFhevmClient(config);
```

#### `useEncrypt(options?)`

Hook for encrypting values.

```typescript
const { encryptValue, isEncrypting, error, data } = useEncrypt({
  onSuccess: (data) => {},
  onError: (error) => {}
});
```

#### `useDecrypt(options?)`

Hook for decrypting values.

```typescript
const { decryptValue, decryptBatch, isDecrypting, error, result } = useDecrypt({
  onSuccess: (result) => {},
  onError: (error) => {}
});
```

## 🎨 Examples

### Complete Next.js Application

See the [Next.js showcase](./examples/nextjs-showcase) for a complete working example.

```bash
cd examples/nextjs-showcase
npm install
npm run dev
```

### Insurance Platform Example

See the [insurance platform example](./examples/insurance-platform) for a real-world production application demonstrating privacy-preserving vehicle insurance claims processing. The live application is deployed at [https://fhe-vehicle-insurance.vercel.app/](https://fhe-vehicle-insurance.vercel.app/) using smart contract `0x2A86c562acc0a861A96E4114d7323987e313795F`.

## 🏗️ Architecture

```
@fhevm/universal-sdk
├── Core (Framework-Agnostic)
│   ├── Client Management
│   ├── Encryption (all FHE types)
│   └── Decryption (with EIP-712 signing)
├── React Integration
│   ├── useFhevmClient
│   ├── useEncrypt
│   └── useDecrypt
└── Utilities
    ├── Type Conversions
    └── Helper Functions
```

## 🚢 Deployment

The showcase is deployed at: [https://fhe-vehicle-insurance.vercel.app/](https://fhe-vehicle-insurance.vercel.app/)

## 📝 Documentation

- [Getting Started Guide](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)
- [Migration Guide](./docs/migration.md)
- [Best Practices](./docs/best-practices.md)

## 🧪 Testing

```bash
# Run SDK tests
cd packages/fhevm-sdk
npm test

# Run Next.js example
cd examples/nextjs-showcase
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

Built with:
- [fhevmjs](https://github.com/zama-ai/fhevmjs) - Official Zama FHEVM JavaScript library
- [Zama Oracle](https://github.com/zama-ai/fhevm-oracle) - Decryption oracle
- TypeScript, React, Next.js

## 📞 Support

- 📚 [Documentation](./docs)
- 🐛 [Issue Tracker](https://github.com/LulaPadberg/fhevm-react-template/issues)
- 💬 [Discussions](https://github.com/LulaPadberg/fhevm-react-template/discussions)
- 🌐 [Zama Discord](https://discord.gg/zama)

## 🎯 Roadmap

- [ ] Vue.js composables
- [ ] Angular services
- [ ] Svelte stores
- [ ] React Native support
- [ ] Enhanced error handling
- [ ] Batch operations optimization
- [ ] Caching layer
- [ ] DevTools integration

---

**Built with ❤️ for the Fully Homomorphic Encryption community**

