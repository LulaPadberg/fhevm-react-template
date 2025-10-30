/**
 * Encryption Hook
 * Provides encryption functionality with state management
 */

import { useEncrypt } from '@fhevm/universal-sdk/react';
import type { FHEType, EncryptionOptions } from '../lib/fhe/types';

export function useEncryption(options?: EncryptionOptions) {
  const { encryptValue, isEncrypting, error, data } = useEncrypt({
    onSuccess: options?.onSuccess,
    onError: options?.onError
  });

  const encrypt = async <T extends FHEType>(type: T, value: any) => {
    try {
      const result = await encryptValue(type, value);
      return result;
    } catch (err) {
      console.error('Encryption error:', err);
      throw err;
    }
  };

  return {
    encrypt,
    encryptValue,
    isEncrypting,
    error,
    data
  };
}
