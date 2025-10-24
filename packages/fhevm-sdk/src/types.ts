import type { FhevmInstance } from 'fhevmjs';
import type { Signer, BrowserProvider } from 'ethers';

/**
 * Configuration for FHEVM SDK initialization
 */
export interface FhevmConfig {
  /**
   * Network configuration
   */
  network: {
    chainId: number;
    rpcUrl: string;
    name: string;
  };

  /**
   * Gateway configuration for decryption
   */
  gateway?: {
    url: string;
    relayerAddress?: string;
  };

  /**
   * ACL contract address for access control
   */
  aclAddress?: string;

  /**
   * Custom provider (optional)
   */
  provider?: BrowserProvider;
}

/**
 * FHEVM Client context
 */
export interface FhevmClient {
  instance: FhevmInstance | null;
  provider: BrowserProvider | null;
  signer: Signer | null;
  config: FhevmConfig;
  isInitialized: boolean;
}

/**
 * Encryption result
 */
export interface EncryptedData {
  data: Uint8Array;
  handles: string[];
}

/**
 * Decryption request
 */
export interface DecryptRequest {
  contractAddress: string;
  handle: string;
}

/**
 * Decryption result
 */
export interface DecryptResult {
  value: bigint;
  success: boolean;
}

/**
 * Hook options for React integration
 */
export interface UseEncryptOptions {
  onSuccess?: (data: EncryptedData) => void;
  onError?: (error: Error) => void;
}

export interface UseDecryptOptions {
  onSuccess?: (result: DecryptResult) => void;
  onError?: (error: Error) => void;
}
