# API Reference

Complete API documentation for the Universal FHEVM SDK.

## Core Functions

### `createFhevmClient(config)`

Creates and initializes the FHEVM client instance.

**Parameters:**
- `config` (FhevmConfig): Configuration object
  - `network` (required): Network configuration
    - `chainId` (number): Chain ID
    - `rpcUrl` (string): RPC endpoint URL
    - `name` (string): Network display name
  - `gateway` (optional): Gateway configuration
    - `url` (string): Gateway URL
    - `relayerAddress` (string): Relayer address
  - `aclAddress` (optional string): ACL contract address
  - `provider` (optional BrowserProvider): Custom provider

**Returns:** `Promise<FhevmClient>`

**Example:**
```typescript
const client = await createFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  }
});
```

---

### `getFhevmClient()`

Retrieves the current FHEVM client instance.

**Returns:** `FhevmClient`

**Throws:** Error if client not initialized

**Example:**
```typescript
const client = getFhevmClient();
```

---

### `resetFhevmClient()`

Resets the global FHEVM client instance.

**Returns:** `void`

---

### `encrypt(type, value)`

Generic encryption function with automatic type handling.

**Parameters:**
- `type` ('bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'address'): Encryption type
- `value` (any): Value to encrypt

**Returns:** `Promise<Uint8Array>`

**Example:**
```typescript
const encrypted = await encrypt('uint32', 12345);
```

---

### `encryptBool(value)`

Encrypts a boolean value.

**Parameters:**
- `value` (boolean): Boolean to encrypt

**Returns:** `Promise<Uint8Array>`

---

### `encryptUint8(value)` / `encryptUint16(value)` / `encryptUint32(value)` / `encryptUint64(value)`

Encrypts unsigned integer values.

**Parameters:**
- `value` (number | bigint): Number to encrypt

**Returns:** `Promise<Uint8Array>`

---

### `encryptAddress(value)`

Encrypts an Ethereum address.

**Parameters:**
- `value` (string): Address to encrypt

**Returns:** `Promise<Uint8Array>`

---

### `decrypt(request)`

Decrypts an encrypted value.

**Parameters:**
- `request` (DecryptRequest):
  - `contractAddress` (string): Contract address
  - `handle` (string): Encrypted value handle

**Returns:** `Promise<DecryptResult>`
- `value` (bigint): Decrypted value
- `success` (boolean): Success status

**Example:**
```typescript
const result = await decrypt({
  contractAddress: '0x...',
  handle: '0x...'
});
console.log(result.value);
```

---

### `batchDecrypt(requests)`

Decrypts multiple encrypted values in parallel.

**Parameters:**
- `requests` (DecryptRequest[]): Array of decrypt requests

**Returns:** `Promise<DecryptResult[]>`

**Example:**
```typescript
const results = await batchDecrypt([
  { contractAddress: '0x...', handle: '0x...' },
  { contractAddress: '0x...', handle: '0x...' }
]);
```

---

## React Hooks

### `useFhevmClient(config)`

React hook for FHEVM client management.

**Parameters:**
- `config` (FhevmConfig): Client configuration

**Returns:** Object
- `client` (FhevmClient | null): Client instance
- `isLoading` (boolean): Loading state
- `error` (Error | null): Error state
- `isReady` (boolean): Ready state

**Example:**
```typescript
const { client, isReady, isLoading, error } = useFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  }
});
```

---

### `useEncrypt(options?)`

React hook for encryption operations.

**Parameters:**
- `options` (UseEncryptOptions, optional):
  - `onSuccess` (function): Success callback
  - `onError` (function): Error callback

**Returns:** Object
- `encryptValue` (function): Encryption function
- `isEncrypting` (boolean): Loading state
- `error` (Error | null): Error state
- `data` (Uint8Array | null): Encrypted data

**Example:**
```typescript
const { encryptValue, isEncrypting, error, data } = useEncrypt({
  onSuccess: (data) => console.log('Success!'),
  onError: (err) => console.error(err)
});

await encryptValue('uint32', 12345);
```

---

### `useDecrypt(options?)`

React hook for decryption operations.

**Parameters:**
- `options` (UseDecryptOptions, optional):
  - `onSuccess` (function): Success callback
  - `onError` (function): Error callback

**Returns:** Object
- `decryptValue` (function): Decryption function
- `decryptBatch` (function): Batch decryption function
- `isDecrypting` (boolean): Loading state
- `error` (Error | null): Error state
- `result` (DecryptResult | null): Decryption result

**Example:**
```typescript
const { decryptValue, isDecrypting, result } = useDecrypt({
  onSuccess: (result) => console.log('Decrypted:', result.value)
});

await decryptValue({
  contractAddress: '0x...',
  handle: '0x...'
});
```

---

## Utility Functions

### `uint8ArrayToHex(arr)`

Converts Uint8Array to hex string.

**Parameters:**
- `arr` (Uint8Array): Array to convert

**Returns:** `string`

---

### `hexToUint8Array(hex)`

Converts hex string to Uint8Array.

**Parameters:**
- `hex` (string): Hex string to convert

**Returns:** `Uint8Array`

---

### `formatAddress(address, chars?)`

Formats an Ethereum address for display.

**Parameters:**
- `address` (string): Address to format
- `chars` (number, optional, default=4): Characters to show

**Returns:** `string`

**Example:**
```typescript
formatAddress('0x1234567890abcdef1234567890abcdef12345678');
// Returns: "0x1234...5678"
```

---

### `isEncrypted(value)`

Type guard to check if a value is encrypted.

**Parameters:**
- `value` (any): Value to check

**Returns:** `boolean`

---

## TypeScript Types

### `FhevmConfig`

```typescript
interface FhevmConfig {
  network: {
    chainId: number;
    rpcUrl: string;
    name: string;
  };
  gateway?: {
    url: string;
    relayerAddress?: string;
  };
  aclAddress?: string;
  provider?: BrowserProvider;
}
```

### `FhevmClient`

```typescript
interface FhevmClient {
  instance: FhevmInstance | null;
  provider: BrowserProvider | null;
  signer: Signer | null;
  config: FhevmConfig;
  isInitialized: boolean;
}
```

### `EncryptedData`

```typescript
interface EncryptedData {
  data: Uint8Array;
  handles: string[];
}
```

### `DecryptRequest`

```typescript
interface DecryptRequest {
  contractAddress: string;
  handle: string;
}
```

### `DecryptResult`

```typescript
interface DecryptResult {
  value: bigint;
  success: boolean;
}
```
