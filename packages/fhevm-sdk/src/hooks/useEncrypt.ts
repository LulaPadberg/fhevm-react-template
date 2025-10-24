import { useState, useCallback } from 'react';
import { encrypt } from '../core/encrypt';
import type { UseEncryptOptions } from '../types';

/**
 * React hook for encrypting values
 *
 * @example
 * ```typescript
 * function Component() {
 *   const { encryptValue, isEncrypting, error } = useEncrypt({
 *     onSuccess: (data) => console.log('Encrypted!', data),
 *     onError: (err) => console.error('Error:', err)
 *   });
 *
 *   const handleClick = async () => {
 *     const encrypted = await encryptValue('uint32', 12345);
 *   };
 *
 *   return <button onClick={handleClick}>Encrypt</button>;
 * }
 * ```
 */
export function useEncrypt(options?: UseEncryptOptions) {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Uint8Array | null>(null);

  const encryptValue = useCallback(
    async (
      type: 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'address',
      value: any
    ): Promise<Uint8Array | null> => {
      try {
        setIsEncrypting(true);
        setError(null);

        const encrypted = await encrypt(type, value);
        setData(encrypted);

        if (options?.onSuccess) {
          options.onSuccess({ data: encrypted, handles: [] });
        }

        return encrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');
        setError(error);

        if (options?.onError) {
          options.onError(error);
        }

        return null;
      } finally {
        setIsEncrypting(false);
      }
    },
    [options]
  );

  return {
    encryptValue,
    isEncrypting,
    error,
    data,
  };
}
