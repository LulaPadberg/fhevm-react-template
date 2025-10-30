/**
 * Type definitions for FHE operations
 */

export type FHEType = 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'address';

export interface EncryptedValue {
  data: Uint8Array;
  type: FHEType;
}

export interface DecryptRequest {
  contractAddress: string;
  handle: string;
}

export interface DecryptResult {
  value: bigint;
  success: boolean;
}

export interface FHEConfig {
  network: {
    chainId: number;
    rpcUrl: string;
    name: string;
  };
  gateway?: {
    url: string;
    relayerAddress: string;
  };
  aclAddress?: string;
}

export interface EncryptionOptions {
  onSuccess?: (data: EncryptedValue) => void;
  onError?: (error: Error) => void;
}

export interface DecryptionOptions {
  onSuccess?: (result: DecryptResult) => void;
  onError?: (error: Error) => void;
}
