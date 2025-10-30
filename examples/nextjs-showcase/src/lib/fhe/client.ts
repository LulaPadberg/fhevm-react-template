/**
 * Client-side FHE Operations
 * Handles encryption and client-side FHE functionality
 */

import { encrypt, createFhevmClient } from '@fhevm/universal-sdk';

export class FHEClient {
  private static instance: FHEClient;
  private initialized: boolean = false;

  private constructor() {}

  static getInstance(): FHEClient {
    if (!FHEClient.instance) {
      FHEClient.instance = new FHEClient();
    }
    return FHEClient.instance;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      await createFhevmClient({
        network: {
          chainId: 8009,
          rpcUrl: 'https://devnet.zama.ai',
          name: 'Zama Devnet'
        }
      });
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize FHE client:', error);
      throw error;
    }
  }

  async encryptValue<T extends 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'address'>(
    type: T,
    value: any
  ) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const encrypted = await encrypt(type, value);
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const fheClient = FHEClient.getInstance();
