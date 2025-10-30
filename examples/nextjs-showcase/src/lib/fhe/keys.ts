/**
 * Key Management for FHE
 * Handles public/private key operations
 */

export class KeyManager {
  private static publicKey: Uint8Array | null = null;
  private static privateKey: Uint8Array | null = null;

  static async getPublicKey(): Promise<Uint8Array> {
    if (this.publicKey) {
      return this.publicKey;
    }

    try {
      const response = await fetch('https://devnet.zama.ai/fhe-keys');
      const data = await response.json();
      this.publicKey = new Uint8Array(data.publicKey);
      return this.publicKey;
    } catch (error) {
      console.error('Failed to fetch public key:', error);
      throw error;
    }
  }

  static setPublicKey(key: Uint8Array): void {
    this.publicKey = key;
  }

  static clearKeys(): void {
    this.publicKey = null;
    this.privateKey = null;
  }

  static hasPublicKey(): boolean {
    return this.publicKey !== null;
  }
}
