/**
 * Custom hook for FHE operations
 * Provides easy access to encryption and decryption
 */

import { useState, useEffect } from 'react';
import { useFhevmClient } from '@fhevm/universal-sdk/react';
import type { FHEConfig } from '../lib/fhe/types';

export function useFHE(config?: FHEConfig) {
  const { client, isLoading, error, isReady } = useFhevmClient(
    config || {
      network: {
        chainId: 8009,
        rpcUrl: 'https://devnet.zama.ai',
        name: 'Zama Devnet'
      }
    }
  );

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isReady) {
      setInitialized(true);
    }
  }, [isReady]);

  return {
    client,
    isLoading,
    error,
    isReady: initialized,
    fheClient: client
  };
}
