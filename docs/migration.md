# Migration Guide

This guide helps you migrate from using raw fhevmjs to the Universal FHEVM SDK.

## Why Migrate?

The Universal FHEVM SDK provides:

- ✅ **Simpler API** - Less boilerplate code
- ✅ **Better DX** - React hooks and framework-agnostic core
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Maintained** - Regular updates and bug fixes
- ✅ **Production Ready** - Used in real applications

## Migration from fhevmjs

### Before (Raw fhevmjs)

```typescript
import { createInstance } from 'fhevmjs';
import { BrowserProvider } from 'ethers';

// Complex setup
const provider = new BrowserProvider(window.ethereum);
const network = await provider.getNetwork();
const signer = await provider.getSigner();

// Fetch public key manually
const response = await fetch(`${rpcUrl}/fhevm-keys/public-key`);
const publicKey = await response.text();

// Create instance
const instance = await createInstance({
  chainId: Number(network.chainId),
  publicKey: publicKey
});

// Encrypt data
const encrypted = instance.encrypt32(12345);

// Store instance globally
window.fhevmInstance = instance;
```

### After (Universal FHEVM SDK)

#### React Application

```typescript
import { useFhevmClient, useEncrypt } from '@fhevm/universal-sdk/react';

function App() {
  // Simple initialization
  const { client, isReady } = useFhevmClient({
    network: {
      chainId: 8009,
      rpcUrl: 'https://devnet.zama.ai',
      name: 'Zama Devnet'
    }
  });

  // Easy encryption
  const { encryptValue } = useEncrypt();

  const handleEncrypt = async () => {
    const encrypted = await encryptValue('uint32', 12345);
  };

  if (!isReady) return <div>Loading...</div>;

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

#### Framework-Agnostic Application

```typescript
import { createFhevmClient, encrypt } from '@fhevm/universal-sdk';

// Simple initialization
await createFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  }
});

// Easy encryption
const encrypted = await encrypt('uint32', 12345);
```

## Step-by-Step Migration

### Step 1: Install the SDK

```bash
npm uninstall fhevmjs
npm install @fhevm/universal-sdk
```

### Step 2: Update Imports

**Before:**
```typescript
import { createInstance } from 'fhevmjs';
```

**After (React):**
```typescript
import { useFhevmClient, useEncrypt, useDecrypt } from '@fhevm/universal-sdk/react';
```

**After (Framework-Agnostic):**
```typescript
import { createFhevmClient, encrypt, decrypt } from '@fhevm/universal-sdk';
```

### Step 3: Replace Initialization Code

**Before:**
```typescript
const provider = new BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const publicKeyResponse = await fetch(`${rpcUrl}/fhevm-keys/public-key`);
const publicKey = await publicKeyResponse.text();
const instance = await createInstance({ chainId, publicKey });
```

**After (React):**
```typescript
const { client, isReady } = useFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  }
});
```

**After (Framework-Agnostic):**
```typescript
const client = await createFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  }
});
```

### Step 4: Update Encryption Calls

**Before:**
```typescript
const encrypted32 = instance.encrypt32(12345);
const encryptedBool = instance.encryptBool(true);
const encrypted64 = instance.encrypt64(BigInt(99999));
```

**After (React):**
```typescript
const { encryptValue } = useEncrypt();

const encrypted32 = await encryptValue('uint32', 12345);
const encryptedBool = await encryptValue('bool', true);
const encrypted64 = await encryptValue('uint64', BigInt(99999));
```

**After (Framework-Agnostic):**
```typescript
const encrypted32 = await encrypt('uint32', 12345);
const encryptedBool = await encrypt('bool', true);
const encrypted64 = await encrypt('uint64', BigInt(99999));
```

### Step 5: Update Decryption Calls

**Before:**
```typescript
// Manual EIP-712 signing
const signature = await signer.signTypedData(/* ... */);
const response = await fetch(gatewayUrl, {
  method: 'POST',
  body: JSON.stringify({
    signature,
    contractAddress,
    handle
  })
});
const decrypted = await response.json();
```

**After (React):**
```typescript
const { decryptValue, result } = useDecrypt();

await decryptValue({
  contractAddress: '0x...',
  handle: '0x...'
});

console.log(result.value); // bigint
```

**After (Framework-Agnostic):**
```typescript
const result = await decrypt({
  contractAddress: '0x...',
  handle: '0x...'
});

console.log(result.value); // bigint
```

## Migration Examples

### Example 1: Simple Encryption Component

**Before (fhevmjs):**
```typescript
import React, { useState, useEffect } from 'react';
import { createInstance } from 'fhevmjs';
import { BrowserProvider } from 'ethers';

function EncryptComponent() {
  const [instance, setInstance] = useState(null);
  const [encrypted, setEncrypted] = useState(null);

  useEffect(() => {
    async function init() {
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const response = await fetch('https://devnet.zama.ai/fhevm-keys/public-key');
      const publicKey = await response.text();
      const inst = await createInstance({
        chainId: Number(network.chainId),
        publicKey
      });
      setInstance(inst);
    }
    init();
  }, []);

  const handleEncrypt = () => {
    if (instance) {
      const result = instance.encrypt32(12345);
      setEncrypted(result);
    }
  };

  if (!instance) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleEncrypt}>Encrypt</button>
      {encrypted && <p>{encrypted.toString('hex')}</p>}
    </div>
  );
}
```

**After (Universal FHEVM SDK):**
```typescript
import React, { useState } from 'react';
import { useFhevmClient, useEncrypt } from '@fhevm/universal-sdk/react';

function EncryptComponent() {
  const [encrypted, setEncrypted] = useState(null);

  const { isReady } = useFhevmClient({
    network: {
      chainId: 8009,
      rpcUrl: 'https://devnet.zama.ai',
      name: 'Zama Devnet'
    }
  });

  const { encryptValue } = useEncrypt();

  const handleEncrypt = async () => {
    const result = await encryptValue('uint32', 12345);
    setEncrypted(result);
  };

  if (!isReady) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleEncrypt}>Encrypt</button>
      {encrypted && <p>{Buffer.from(encrypted).toString('hex')}</p>}
    </div>
  );
}
```

### Example 2: Contract Interaction

**Before (fhevmjs):**
```typescript
import { createInstance } from 'fhevmjs';
import { Contract, BrowserProvider } from 'ethers';

async function createPolicy(vin, model, year) {
  // Initialize
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const network = await provider.getNetwork();

  // Get public key
  const response = await fetch('https://devnet.zama.ai/fhevm-keys/public-key');
  const publicKey = await response.text();

  // Create instance
  const instance = await createInstance({
    chainId: Number(network.chainId),
    publicKey
  });

  // Encrypt data
  const encryptedVIN = instance.encrypt64(BigInt(vin));
  const encryptedModel = instance.encrypt32(parseInt(model));
  const encryptedYear = instance.encrypt16(parseInt(year));

  // Call contract
  const contract = new Contract(contractAddress, abi, signer);
  const tx = await contract.createPolicy(
    encryptedVIN,
    encryptedModel,
    encryptedYear
  );

  return tx.wait();
}
```

**After (Universal FHEVM SDK):**
```typescript
import { useEncrypt } from '@fhevm/universal-sdk/react';
import { Contract, BrowserProvider } from 'ethers';

function useCreatePolicy() {
  const { encryptValue } = useEncrypt();

  const createPolicy = async (vin, model, year) => {
    // Encrypt data
    const encryptedVIN = await encryptValue('uint64', BigInt(vin));
    const encryptedModel = await encryptValue('uint32', parseInt(model));
    const encryptedYear = await encryptValue('uint16', parseInt(year));

    // Call contract
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, abi, signer);
    const tx = await contract.createPolicy(
      encryptedVIN,
      encryptedModel,
      encryptedYear
    );

    return tx.wait();
  };

  return { createPolicy };
}
```

## Common Issues and Solutions

### Issue 1: "Client not initialized"

**Cause:** Trying to encrypt before client is ready.

**Solution:**
```typescript
const { client, isReady } = useFhevmClient(config);

if (!isReady) {
  return <div>Loading...</div>;
}

// Now safe to encrypt
```

### Issue 2: TypeScript errors with encrypted data

**Cause:** Encrypted data is `Uint8Array`, not a hex string.

**Solution:**
```typescript
// Convert to hex if needed
const encrypted = await encryptValue('uint32', 12345);
const hex = Buffer.from(encrypted).toString('hex');
```

### Issue 3: Multiple re-initializations in React

**Cause:** Creating client in component body instead of using hooks.

**Solution:**
```typescript
// ❌ Wrong
function Component() {
  createFhevmClient(config); // Re-creates on every render
}

// ✅ Correct
function Component() {
  const { client } = useFhevmClient(config); // Manages lifecycle
}
```

## Breaking Changes

### Version 1.x to 2.x

1. **Encryption methods renamed:**
   - `encrypt32()` → `encryptValue('uint32', value)`
   - `encryptBool()` → `encryptValue('bool', value)`
   - All types now use unified `encryptValue()` API

2. **Client initialization:**
   - Old global `window.fhevmInstance` pattern deprecated
   - Use `useFhevmClient()` hook or `createFhevmClient()` function

3. **Configuration:**
   - `publicKey` no longer required (fetched automatically)
   - `network` configuration simplified

## Need Help?

- 📚 [API Reference](./api-reference.md)
- 💬 [GitHub Discussions](https://github.com/LulaPadberg/fhevm-react-template/discussions)
- 🌐 [Zama Discord](https://discord.gg/zama)

## Migration Checklist

- [ ] Install `@fhevm/universal-sdk`
- [ ] Remove `fhevmjs` dependency
- [ ] Update all imports
- [ ] Replace initialization code
- [ ] Update encryption calls
- [ ] Update decryption calls
- [ ] Test all functionality
- [ ] Remove old instance management code
- [ ] Update documentation

---

**Ready to migrate? Check out our [Getting Started Guide](./getting-started.md) for more examples!**
