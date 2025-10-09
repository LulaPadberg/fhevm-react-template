import { getFhevmClient } from './client';
import type { EncryptedData } from '../types';

/**
 * Encrypt a boolean value
 *
 * @example
 * ```typescript
 * const encrypted = await encryptBool(true);
 * ```
 */
export async function encryptBool(value: boolean): Promise<Uint8Array> {
  const client = getFhevmClient();
  if (!client.instance) {
    throw new Error('FHEVM instance not initialized');
  }
  return client.instance.encrypt_bool(value);
}

/**
 * Encrypt a uint8 value
 *
 * @example
 * ```typescript
 * const encrypted = await encryptUint8(42);
 * ```
 */
export async function encryptUint8(value: number): Promise<Uint8Array> {
  const client = getFhevmClient();
  if (!client.instance) {
    throw new Error('FHEVM instance not initialized');
  }
  return client.instance.encrypt_uint8(value);
}

/**
 * Encrypt a uint16 value
 */
export async function encryptUint16(value: number): Promise<Uint8Array> {
  const client = getFhevmClient();
  if (!client.instance) {
    throw new Error('FHEVM instance not initialized');
  }
  return client.instance.encrypt_uint16(value);
}

/**
 * Encrypt a uint32 value
 */
export async function encryptUint32(value: number): Promise<Uint8Array> {
  const client = getFhevmClient();
  if (!client.instance) {
    throw new Error('FHEVM instance not initialized');
  }
  return client.instance.encrypt_uint32(value);
}

/**
 * Encrypt a uint64 value
 */
export async function encryptUint64(value: bigint): Promise<Uint8Array> {
  const client = getFhevmClient();
  if (!client.instance) {
    throw new Error('FHEVM instance not initialized');
  }
  return client.instance.encrypt_uint64(value);
}

/**
 * Encrypt an address
 */
export async function encryptAddress(value: string): Promise<Uint8Array> {
  const client = getFhevmClient();
  if (!client.instance) {
    throw new Error('FHEVM instance not initialized');
  }
  return client.instance.encrypt_address(value);
}

/**
 * Generic encrypt function with type inference
 *
 * @example
 * ```typescript
 * const data = await encrypt('uint32', 12345);
 * ```
 */
export async function encrypt(
  type: 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'address',
  value: any
): Promise<Uint8Array> {
  switch (type) {
    case 'bool':
      return encryptBool(value);
    case 'uint8':
      return encryptUint8(value);
    case 'uint16':
      return encryptUint16(value);
    case 'uint32':
      return encryptUint32(value);
    case 'uint64':
      return encryptUint64(value);
    case 'address':
      return encryptAddress(value);
    default:
      throw new Error(`Unsupported encryption type: ${type}`);
  }
}
