import { useState, useEffect } from 'react';
import { createFhevmClient, getFhevmClient } from '../core/client';
import type { FhevmConfig, FhevmClient } from '../types';

/**
 * React hook for FHEVM client initialization and management
 *
 * @example
 * ```typescript
 * function App() {
 *   const { client, isLoading, error } = useFhevmClient({
 *     network: {
 *       chainId: 8009,
 *       rpcUrl: 'https://devnet.zama.ai',
 *       name: 'Zama Devnet'
 *     }
 *   });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return <div>FHEVM Ready!</div>;
 * }
 * ```
 */
export function useFhevmClient(config: FhevmConfig) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initClient() {
      try {
        setIsLoading(true);
        setError(null);

        const fhevmClient = await createFhevmClient(config);

        if (mounted) {
          setClient(fhevmClient);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize FHEVM client'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initClient();

    return () => {
      mounted = false;
    };
  }, [config.network.chainId, config.network.rpcUrl]);

  return {
    client,
    isLoading,
    error,
    isReady: !isLoading && !error && client !== null,
  };
}
