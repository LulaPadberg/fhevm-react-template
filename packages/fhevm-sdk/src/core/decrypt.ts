import { getFhevmClient } from './client';
import type { DecryptRequest, DecryptResult } from '../types';

/**
 * Request decryption for an encrypted value
 *
 * @example
 * ```typescript
 * const result = await decrypt({
 *   contractAddress: '0x...',
 *   handle: '0x...'
 * });
 * console.log(result.value); // bigint
 * ```
 */
export async function decrypt(request: DecryptRequest): Promise<DecryptResult> {
  const client = getFhevmClient();

  if (!client.instance || !client.signer) {
    throw new Error('FHEVM client not properly initialized');
  }

  try {
    // Generate EIP-712 signature for decryption request
    const { publicKey, signature } = await generateDecryptionSignature(
      client.signer,
      request.contractAddress
    );

    // Request decryption from gateway
    const gatewayUrl =
      client.config.gateway?.url || 'https://gateway.zama.ai/decrypt';

    const response = await fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractAddress: request.contractAddress,
        handle: request.handle,
        publicKey,
        signature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Decryption request failed: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      value: BigInt(data.value),
      success: true,
    };
  } catch (error) {
    console.error('Decryption error:', error);
    return {
      value: BigInt(0),
      success: false,
    };
  }
}

/**
 * Generate EIP-712 signature for decryption
 */
async function generateDecryptionSignature(
  signer: any,
  contractAddress: string
): Promise<{ publicKey: string; signature: string }> {
  const userAddress = await signer.getAddress();

  const domain = {
    name: 'FHEVM Decryption',
    version: '1',
    chainId: (await signer.provider.getNetwork()).chainId,
    verifyingContract: contractAddress,
  };

  const types = {
    Decryption: [
      { name: 'user', type: 'address' },
      { name: 'contract', type: 'address' },
    ],
  };

  const value = {
    user: userAddress,
    contract: contractAddress,
  };

  const signature = await signer.signTypedData(domain, types, value);

  return {
    publicKey: userAddress,
    signature,
  };
}

/**
 * Batch decrypt multiple values
 *
 * @example
 * ```typescript
 * const results = await batchDecrypt([
 *   { contractAddress: '0x...', handle: '0x...' },
 *   { contractAddress: '0x...', handle: '0x...' }
 * ]);
 * ```
 */
export async function batchDecrypt(
  requests: DecryptRequest[]
): Promise<DecryptResult[]> {
  return Promise.all(requests.map((req) => decrypt(req)));
}
