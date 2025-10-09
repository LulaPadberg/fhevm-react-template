import { createInstance, type FhevmInstance } from 'fhevmjs';
import { BrowserProvider, type Signer } from 'ethers';
import type { FhevmConfig, FhevmClient } from '../types';

/**
 * Global FHEVM client instance
 */
let globalClient: FhevmClient | null = null;

/**
 * Create and configure FHEVM client
 *
 * @example
 * ```typescript
 * const client = await createFhevmClient({
 *   network: {
 *     chainId: 8009,
 *     rpcUrl: 'https://devnet.zama.ai',
 *     name: 'Zama Devnet'
 *   }
 * });
 * ```
 */
export async function createFhevmClient(config: FhevmConfig): Promise<FhevmClient> {
  const provider = config.provider || new BrowserProvider(window.ethereum);

  // Get signer
  const signer = await provider.getSigner();

  // Create FHEVM instance
  const instance = await createInstance({
    chainId: config.network.chainId,
    publicKey: await getPublicKey(config.network.rpcUrl, config.aclAddress),
  });

  const client: FhevmClient = {
    instance,
    provider,
    signer,
    config,
    isInitialized: true,
  };

  // Store globally for framework-agnostic access
  globalClient = client;

  return client;
}

/**
 * Get the current FHEVM client instance
 */
export function getFhevmClient(): FhevmClient {
  if (!globalClient || !globalClient.isInitialized) {
    throw new Error('FHEVM client not initialized. Call createFhevmClient() first.');
  }
  return globalClient;
}

/**
 * Reset the FHEVM client
 */
export function resetFhevmClient(): void {
  globalClient = null;
}

/**
 * Fetch public key from blockchain
 */
async function getPublicKey(rpcUrl: string, aclAddress?: string): Promise<string> {
  const provider = new BrowserProvider(window.ethereum);

  // Request public key from ACL contract or use default method
  if (aclAddress) {
    const code = await provider.getCode(aclAddress);
    if (code === '0x') {
      throw new Error(`ACL contract not found at ${aclAddress}`);
    }
  }

  // Fetch public key using standard method
  const response = await fetch(`${rpcUrl}/fhevm/publicKey`);
  if (!response.ok) {
    throw new Error('Failed to fetch FHEVM public key');
  }

  const { publicKey } = await response.json();
  return publicKey;
}
