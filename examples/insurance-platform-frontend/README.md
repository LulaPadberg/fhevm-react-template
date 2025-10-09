# Insurance Platform Frontend

Complete insurance platform frontend demonstrating the Universal FHEVM SDK in a production setting.

## Features

- **Privacy-Preserving Insurance** - All sensitive data encrypted with FHE
- **Universal FHEVM SDK** - Seamless encryption/decryption integration
- **Create Policies** - Encrypted vehicle information (VIN, model, year)
- **Submit Claims** - Private claim amounts and descriptions
- **Real-time Status** - Live SDK status and transaction tracking

## SDK Integration

This example showcases how to use the Universal FHEVM SDK in a real-world application:

```typescript
import { useFhevmClient, useEncrypt } from '@fhevm/universal-sdk/react';

// Initialize SDK
const { client, isReady } = useFhevmClient({
  network: {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    name: 'Zama Devnet'
  }
});

// Encrypt data
const { encryptValue } = useEncrypt();
const encryptedVIN = await encryptValue('uint64', BigInt(vin));
```

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will run on `http://localhost:3001`

## Smart Contracts

This frontend integrates with the insurance smart contracts in `examples/insurance-platform/`:

- `PrivateVehicleInsurance.sol` - Main insurance contract
- `PauserSet.sol` - Emergency pause management

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_INSURANCE_CONTRACT=0x...
NEXT_PUBLIC_CHAIN_ID=8009
NEXT_PUBLIC_RPC_URL=https://devnet.zama.ai
```

## How It Works

1. **SDK Initialization** - FHEVM client initializes with network config
2. **Data Entry** - User enters sensitive information
3. **Client-Side Encryption** - Data encrypted using FHE before leaving browser
4. **Contract Interaction** - Encrypted data sent to smart contracts
5. **On-Chain Privacy** - All data remains encrypted on blockchain
6. **Authorized Decryption** - Only authorized users can decrypt results

## Privacy Guarantees

- ✅ VIN numbers never visible on-chain
- ✅ Vehicle models encrypted
- ✅ Claim amounts private
- ✅ Personal data protected
- ✅ Computations on encrypted data
- ✅ Zero-knowledge proofs

## Tech Stack

- **Next.js 14** - React framework
- **Universal FHEVM SDK** - FHE encryption
- **ethers.js** - Ethereum interaction
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## Learn More

- [Universal FHEVM SDK Documentation](../../docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
- [Smart Contracts](../insurance-platform)
