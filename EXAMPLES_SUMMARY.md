# Examples Summary - Universal FHEVM SDK

All examples demonstrate the Universal FHEVM SDK integration in different contexts.

---

## ✅ Example 1: Next.js Showcase (Required)

**Location:** `examples/nextjs-showcase/`

**Purpose:** Basic SDK demonstration with interactive encryption

**SDK Integration:**
```typescript
import { useFhevmClient, useEncrypt, useDecrypt } from '@fhevm/universal-sdk/react';

const { client, isReady } = useFhevmClient(config);
const { encryptValue } = useEncrypt();
```

**Features:**
- Live FHEVM status indicator
- Interactive number encryption
- Real-time encrypted results
- "How It Works" guide

**Run:**
```bash
cd examples/nextjs-showcase
npm install
npm run dev  # Port 3000
```

---

## ✅ Example 2: Insurance Platform Frontend

**Location:** `examples/insurance-platform-frontend/`

**Purpose:** Production-grade insurance application using SDK

**SDK Integration:**
```typescript
import { useFhevmClient, useEncrypt } from '@fhevm/universal-sdk/react';

// Create encrypted policy
const encryptedVIN = await encryptValue('uint64', BigInt(vin));
const encryptedModel = await encryptValue('uint32', parseInt(model));
const encryptedYear = await encryptValue('uint16', parseInt(year));

// Submit to smart contract
const tx = await contract.createPolicy(
  encryptedVIN,
  encryptedModel,
  encryptedYear
);
```

**Features:**
- Complete insurance workflow
- Create encrypted policies
- Submit private claims
- Real-world smart contract integration
- Privacy-preserving data handling

**Run:**
```bash
cd examples/insurance-platform-frontend
npm install
npm run dev  # Port 3001
```

---

## ✅ Example 3: Insurance Platform Contracts

**Location:** `examples/insurance-platform/`

**Purpose:** Smart contracts that work with SDK-encrypted data

**Contracts:**
- `PrivateVehicleInsurance.sol` - Main insurance logic
- `PauserSet.sol` - Emergency pause system

**Integration:**
The frontend examples use the Universal FHEVM SDK to encrypt data before sending it to these contracts.

**Test:**
```bash
cd examples/insurance-platform
npm install
npx hardhat test  # 65 tests (100% passing)
```

---

## SDK Usage Comparison

### Framework-Agnostic Core

All examples can also use the core SDK without React hooks:

```typescript
import { createFhevmClient, encrypt } from '@fhevm/universal-sdk';

await createFhevmClient(config);
const encrypted = await encrypt('uint32', 12345);
```

### React Hooks (Recommended for React/Next.js)

```typescript
import { useFhevmClient, useEncrypt } from '@fhevm/universal-sdk/react';

const { client, isReady } = useFhevmClient(config);
const { encryptValue, isEncrypting } = useEncrypt();
```

---

## Verification Checklist

| Example | SDK Integrated | Tests | Documentation |
|---------|---------------|-------|---------------|
| Next.js Showcase | ✅ Yes | N/A | ✅ Yes |
| Insurance Frontend | ✅ Yes | N/A | ✅ Yes |
| Insurance Contracts | ✅ Compatible | ✅ 65/65 | ✅ Yes |

---

## Running All Examples

### Option 1: Individual

```bash
# Example 1: Next.js Showcase
cd examples/nextjs-showcase
npm install && npm run dev

# Example 2: Insurance Frontend
cd examples/insurance-platform-frontend
npm install && npm run dev

# Example 3: Test Contracts
cd examples/insurance-platform
npm install && npx hardhat test
```

### Option 2: Monorepo (pnpm)

```bash
# Install all dependencies
pnpm install

# Run specific example
pnpm --filter nextjs-showcase dev
pnpm --filter insurance-platform-frontend dev
```

---

## Key Takeaways

### 1. Consistent SDK Usage

All frontend examples use the same SDK API:
- `useFhevmClient()` for initialization
- `useEncrypt()` for encryption
- Same configuration pattern

### 2. Real-World Integration

The insurance platform shows how to:
- Encrypt user input
- Send encrypted data to contracts
- Handle transactions
- Display status

### 3. Production-Ready

All examples include:
- Error handling
- Loading states
- TypeScript types
- Proper configuration

---

## Next Steps

1. **Try the Examples**
   - Run each example locally
   - Test encryption functionality
   - Review the code

2. **Build Your Own**
   - Use the SDK in your project
   - Follow the patterns from examples
   - Refer to documentation

3. **Deploy**
   - Deploy smart contracts
   - Deploy frontend to Vercel/Netlify
   - Update contract addresses

---

**All examples are production-ready and use the Universal FHEVM SDK ✨**
