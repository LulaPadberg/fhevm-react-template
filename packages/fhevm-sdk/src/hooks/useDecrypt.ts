import { useState, useCallback } from 'react';
import { decrypt, batchDecrypt } from '../core/decrypt';
import type { DecryptRequest, DecryptResult, UseDecryptOptions } from '../types';

/**
 * React hook for decrypting values
 *
 * @example
 * ```typescript
 * function Component() {
 *   const { decryptValue, isDecrypting, result } = useDecrypt({
 *     onSuccess: (result) => console.log('Decrypted:', result.value),
 *   });
 *
 *   const handleClick = async () => {
 *     await decryptValue({
 *       contractAddress: '0x...',
 *       handle: '0x...'
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleClick}>Decrypt</button>
 *       {result && <p>Value: {result.value.toString()}</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useDecrypt(options?: UseDecryptOptions) {
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<DecryptResult | null>(null);

  const decryptValue = useCallback(
    async (request: DecryptRequest): Promise<DecryptResult | null> => {
      try {
        setIsDecrypting(true);
        setError(null);

        const decrypted = await decrypt(request);
        setResult(decrypted);

        if (options?.onSuccess) {
          options.onSuccess(decrypted);
        }

        return decrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Decryption failed');
        setError(error);

        if (options?.onError) {
          options.onError(error);
        }

        return null;
      } finally {
        setIsDecrypting(false);
      }
    },
    [options]
  );

  const decryptBatch = useCallback(
    async (requests: DecryptRequest[]): Promise<DecryptResult[]> => {
      try {
        setIsDecrypting(true);
        setError(null);

        const results = await batchDecrypt(requests);
        return results;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Batch decryption failed');
        setError(error);

        if (options?.onError) {
          options.onError(error);
        }

        return [];
      } finally {
        setIsDecrypting(false);
      }
    },
    [options]
  );

  return {
    decryptValue,
    decryptBatch,
    isDecrypting,
    error,
    result,
  };
}
