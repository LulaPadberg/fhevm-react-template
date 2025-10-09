# Getting Started with Universal FHEVM SDK

## Introduction

The Universal FHEVM SDK is a framework-agnostic toolkit that makes building confidential frontends with Fully Homomorphic Encryption (FHE) simple and intuitive. This guide will walk you through installation, setup, and creating your first encrypted application.

## Prerequisites

- Node.js >= 18.0.0
- npm, yarn, or pnpm
- Basic understanding of web3 and blockchain
- MetaMask or similar web3 wallet

## Installation

Choose your preferred package manager:

```bash
# npm
npm install @fhevm/universal-sdk

# yarn
yarn add @fhevm/universal-sdk

# pnpm
pnpm add @fhevm/universal-sdk
```

## Quick Start

### 1. Framework-Agnostic Usage (Node.js, Vanilla JS)

```typescript
import { createFhevmClient, encrypt, decrypt } from '@fhevm/universal-sdk';

// Initialize FHEVM client
const client = await createFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  }
});

// Encrypt a value
const encryptedValue = await encrypt('uint32', 12345);

// Use encrypted value in your smart contract call
const tx = await contract.submitEncryptedData(encryptedValue);
await tx.wait();

// Decrypt a value
const result = await decrypt({
  contractAddress: '0x...',
  handle: '0x...'
});

console.log('Decrypted value:', result.value);
```

### 2. React Integration

```typescript
'use client';

import { useFhevmClient, useEncrypt, useDecrypt } from '@fhevm/universal-sdk/react';

export default function App() {
  // Initialize FHEVM
  const { client, isReady, isLoading, error } = useFhevmClient({
    network: {
      chainId: 8009,
      rpcUrl: 'https://devnet.zama.ai',
      name: 'Zama Devnet'
    }
  });

  // Encryption hook
  const { encryptValue, isEncrypting } = useEncrypt({
    onSuccess: (data) => console.log('Encrypted successfully!', data),
    onError: (err) => console.error('Encryption failed:', err)
  });

  // Decryption hook
  const { decryptValue, isDecrypting, result } = useDecrypt({
    onSuccess: (result) => console.log('Decrypted:', result.value)
  });

  if (isLoading) return <div>Initializing FHEVM...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEncrypt = async () => {
    const encrypted = await encryptValue('uint32', 42);
    // Use encrypted data in your contract
  };

  const handleDecrypt = async () => {
    await decryptValue({
      contractAddress: '0x...',
      handle: '0x...'
    });
  };

  return (
    <div>
      <button onClick={handleEncrypt} disabled={isEncrypting}>
        Encrypt Value
      </button>
      <button onClick={handleDecrypt} disabled={isDecrypting}>
        Decrypt Value
      </button>
      {result && <p>Decrypted: {result.value.toString()}</p>}
    </div>
  );
}
```

### 3. Vue Integration

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { createFhevmClient, encrypt, decrypt } from '@fhevm/universal-sdk';

const isReady = ref(false);
const isLoading = ref(false);
const encryptedData = ref(null);
const decryptedValue = ref(null);

onMounted(async () => {
  try {
    await createFhevmClient({
      network: {
        chainId: 8009,
        rpcUrl: 'https://devnet.zama.ai',
        name: 'Zama Devnet'
      }
    });
    isReady.value = true;
  } catch (error) {
    console.error('Failed to initialize FHEVM:', error);
  }
});

async function handleEncrypt() {
  isLoading.value = true;
  try {
    encryptedData.value = await encrypt('uint32', 12345);
  } catch (error) {
    console.error('Encryption failed:', error);
  } finally {
    isLoading.value = false;
  }
}

async function handleDecrypt() {
  isLoading.value = true;
  try {
    const result = await decrypt({
      contractAddress: '0x...',
      handle: '0x...'
    });
    decryptedValue.value = result.value;
  } catch (error) {
    console.error('Decryption failed:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div v-if="isReady">
    <button @click="handleEncrypt" :disabled="isLoading">
      Encrypt
    </button>
    <button @click="handleDecrypt" :disabled="isLoading">
      Decrypt
    </button>
    <p v-if="decryptedValue">Decrypted: {{ decryptedValue }}</p>
  </div>
  <div v-else>Loading FHEVM...</div>
</template>
```

## Configuration

### Network Configuration

```typescript
const config = {
  network: {
    chainId: 8009,              // Network chain ID
    rpcUrl: 'https://devnet.zama.ai',  // RPC endpoint
    name: 'Zama Devnet'         // Network name (for display)
  },
  gateway: {
    url: 'https://gateway.zama.ai/decrypt',  // Optional: custom gateway URL
    relayerAddress: '0x...'     // Optional: relayer address
  },
  aclAddress: '0x...'           // Optional: ACL contract address
};
```

### Supported Networks

- **Zama Devnet**: `chainId: 8009`, `rpcUrl: 'https://devnet.zama.ai'`
- **Local Hardhat**: `chainId: 31337`, `rpcUrl: 'http://localhost:8545'`
- Custom networks supported

## Encryption Types

The SDK supports all FHEVM encryption types:

```typescript
// Boolean
const encryptedBool = await encrypt('bool', true);

// Unsigned integers
const encryptedUint8 = await encrypt('uint8', 42);
const encryptedUint16 = await encrypt('uint16', 1000);
const encryptedUint32 = await encrypt('uint32', 12345);
const encryptedUint64 = await encrypt('uint64', BigInt(999999));

// Address
const encryptedAddr = await encrypt('address', '0x...');
```

## Error Handling

```typescript
try {
  const encrypted = await encrypt('uint32', 12345);
} catch (error) {
  if (error.message.includes('not initialized')) {
    console.error('FHEVM client not initialized');
  } else {
    console.error('Encryption failed:', error);
  }
}
```

## Next Steps

- Read the [API Reference](./api-reference.md) for detailed API documentation
- Check out the [Best Practices](./best-practices.md) guide
- Explore the [examples](../examples) directory
- Join the [Zama Discord](https://discord.gg/zama) for support

## Troubleshooting

### Common Issues

**Issue**: "FHEVM client not initialized"
**Solution**: Make sure to call `createFhevmClient()` or use `useFhevmClient()` hook before encryption/decryption

**Issue**: "Failed to fetch FHEVM public key"
**Solution**: Check your network configuration and ensure the RPC URL is correct

**Issue**: "Transaction reverted"
**Solution**: Verify that the encrypted data format matches your contract's expected input

For more help, see our [GitHub Discussions](https://github.com/your-repo/discussions).
