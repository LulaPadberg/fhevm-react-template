# Best Practices for Universal FHEVM SDK

## General Guidelines

### 1. Client Initialization

**✅ DO**: Initialize once at the application root

```typescript
// App.tsx or _app.tsx
function App() {
  const { client, isReady } = useFhevmClient(config);

  if (!isReady) return <Loading />;

  return <YourApp />;
}
```

**❌ DON'T**: Initialize in multiple components

```typescript
// Bad: Multiple initializations
function Component1() {
  const { client } = useFhevmClient(config); // ❌
}

function Component2() {
  const { client } = useFhevmClient(config); // ❌
}
```

---

### 2. Error Handling

**✅ DO**: Always handle errors gracefully

```typescript
const { encryptValue } = useEncrypt({
  onError: (error) => {
    console.error('Encryption failed:', error);
    // Show user-friendly message
    toast.error('Failed to encrypt data. Please try again.');
  }
});
```

**✅ DO**: Use try-catch for framework-agnostic code

```typescript
try {
  const encrypted = await encrypt('uint32', value);
} catch (error) {
  handleError(error);
}
```

---

### 3. Loading States

**✅ DO**: Show loading indicators

```typescript
function Component() {
  const { encryptValue, isEncrypting } = useEncrypt();

  return (
    <button onClick={handleEncrypt} disabled={isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Encrypt'}
    </button>
  );
}
```

---

### 4. Type Safety

**✅ DO**: Use TypeScript and proper types

```typescript
// Good: Type-safe
const encrypted: Uint8Array = await encrypt('uint32', 12345);

// Good: Type inference
const { data } = useEncrypt();
if (data) {
  // data is Uint8Array
}
```

**❌ DON'T**: Use `any` or ignore types

```typescript
// Bad
const encrypted: any = await encrypt('uint32', value); // ❌
```

---

### 5. Environment Configuration

**✅ DO**: Use environment variables

```typescript
// .env.local
NEXT_PUBLIC_CHAIN_ID=8009
NEXT_PUBLIC_RPC_URL=https://devnet.zama.ai
NEXT_PUBLIC_NETWORK_NAME=Zama Devnet

// Usage
const { client } = useFhevmClient({
  network: {
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
    name: process.env.NEXT_PUBLIC_NETWORK_NAME!
  }
});
```

---

### 6. Batch Operations

**✅ DO**: Use batch operations for multiple decryptions

```typescript
// Good: Batch decrypt
const results = await batchDecrypt([
  { contractAddress: '0x...', handle: '0x...' },
  { contractAddress: '0x...', handle: '0x...' }
]);

// Bad: Sequential decrypts
const result1 = await decrypt({ contractAddress: '0x...', handle: '0x...' }); // ❌
const result2 = await decrypt({ contractAddress: '0x...', handle: '0x...' }); // ❌
```

---

### 7. Smart Contract Integration

**✅ DO**: Validate encrypted data before sending

```typescript
async function submitEncryptedClaim(amount: number) {
  if (amount <= 0) {
    throw new Error('Invalid amount');
  }

  const encryptedAmount = await encryptValue('uint32', amount);

  // Validate encryption succeeded
  if (!encryptedAmount) {
    throw new Error('Encryption failed');
  }

  // Send to contract
  const tx = await contract.submitClaim(encryptedAmount);
  await tx.wait();
}
```

---

### 8. Security

**✅ DO**: Never log or expose encrypted data unnecessarily

```typescript
// Bad: Logging sensitive data
console.log('Encrypted value:', encryptedData); // ❌

// Good: Log only metadata
console.log('Encryption completed successfully'); // ✅
```

**✅ DO**: Validate contract addresses

```typescript
function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

if (!isValidAddress(contractAddress)) {
  throw new Error('Invalid contract address');
}
```

---

### 9. Performance

**✅ DO**: Memoize configuration objects

```typescript
const fhevmConfig = useMemo(() => ({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  }
}), []); // Empty deps - config never changes

const { client } = useFhevmClient(fhevmConfig);
```

**✅ DO**: Avoid unnecessary re-encryptions

```typescript
// Good: Cache encrypted values
const [cachedEncrypted, setCachedEncrypted] = useState<Uint8Array | null>(null);

if (!cachedEncrypted) {
  const encrypted = await encryptValue('uint32', value);
  setCachedEncrypted(encrypted);
}
```

---

### 10. Testing

**✅ DO**: Mock the SDK in tests

```typescript
// Mock for testing
jest.mock('@fhevm/universal-sdk/react', () => ({
  useFhevmClient: () => ({
    client: mockClient,
    isReady: true,
    isLoading: false,
    error: null
  }),
  useEncrypt: () => ({
    encryptValue: jest.fn().mockResolvedValue(mockEncryptedData),
    isEncrypting: false,
    error: null
  })
}));
```

---

## Framework-Specific Best Practices

### React

1. **Use hooks in functional components only**
2. **Avoid calling hooks conditionally**
3. **Clean up on unmount if needed**

```typescript
useEffect(() => {
  return () => {
    // Cleanup if needed
    resetFhevmClient();
  };
}, []);
```

### Next.js

1. **Use 'use client' directive for client components**
2. **Store config in environment variables**
3. **Consider SSR implications**

```typescript
'use client'; // Required for client-side hooks

import { useFhevmClient } from '@fhevm/universal-sdk/react';
```

### Vue

1. **Initialize in setup() or onMounted()**
2. **Use reactive refs for state**
3. **Clean up in onUnmounted()**

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createFhevmClient, resetFhevmClient } from '@fhevm/universal-sdk';

onMounted(async () => {
  await createFhevmClient(config);
});

onUnmounted(() => {
  resetFhevmClient();
});
</script>
```

---

## Common Pitfalls

### 1. Forgetting to Initialize

```typescript
// ❌ Error: Client not initialized
const encrypted = await encrypt('uint32', 123);

// ✅ Correct: Initialize first
const client = await createFhevmClient(config);
const encrypted = await encrypt('uint32', 123);
```

### 2. Wrong Type Parameter

```typescript
// ❌ Error: Type mismatch
await encrypt('uint32', true); // bool value for uint32 type

// ✅ Correct: Match type and value
await encrypt('bool', true);
await encrypt('uint32', 12345);
```

### 3. Not Handling Async Operations

```typescript
// ❌ Bad: Not awaiting
const encrypted = encryptValue('uint32', 123); // Returns Promise

// ✅ Good: Await the Promise
const encrypted = await encryptValue('uint32', 123);
```

### 4. Ignoring Loading States

```typescript
// ❌ Bad: No loading indicator
<button onClick={handleEncrypt}>Encrypt</button>

// ✅ Good: Show loading state
<button onClick={handleEncrypt} disabled={isEncrypting}>
  {isEncrypting ? 'Encrypting...' : 'Encrypt'}
</button>
```

---

## Production Checklist

- [ ] Environment variables configured
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] Input validation added
- [ ] Type safety ensured
- [ ] Tests written
- [ ] Documentation updated
- [ ] Performance optimized
- [ ] Security reviewed
- [ ] Accessibility checked

---

## Need Help?

- Check the [API Reference](./api-reference.md)
- Review [examples](../examples)
- Ask in [GitHub Discussions](https://github.com/your-repo/discussions)
- Join [Zama Discord](https://discord.gg/zama)
