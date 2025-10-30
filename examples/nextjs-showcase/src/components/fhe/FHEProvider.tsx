/**
 * FHE Provider Component
 * Provides FHE context to child components
 */

'use client';

import { ReactNode, createContext, useContext } from 'react';
import { useFhevmClient } from '@fhevm/universal-sdk/react';

interface FHEContextValue {
  client: any;
  isReady: boolean;
  isLoading: boolean;
  error: Error | null;
}

const FHEContext = createContext<FHEContextValue | undefined>(undefined);

interface FHEProviderProps {
  children: ReactNode;
  config?: {
    network: {
      chainId: number;
      rpcUrl: string;
      name: string;
    };
  };
}

export function FHEProvider({ children, config }: FHEProviderProps) {
  const { client, isReady, isLoading, error } = useFhevmClient(
    config || {
      network: {
        chainId: 8009,
        rpcUrl: 'https://devnet.zama.ai',
        name: 'Zama Devnet'
      }
    }
  );

  return (
    <FHEContext.Provider value={{ client, isReady, isLoading, error }}>
      {children}
    </FHEContext.Provider>
  );
}

export function useFHEContext() {
  const context = useContext(FHEContext);
  if (!context) {
    throw new Error('useFHEContext must be used within FHEProvider');
  }
  return context;
}
