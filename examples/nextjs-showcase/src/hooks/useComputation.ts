/**
 * Computation Hook
 * Handles FHE computation operations
 */

import { useState } from 'react';

export interface ComputationResult {
  value: bigint;
  success: boolean;
  timestamp: number;
}

export function useComputation() {
  const [isComputing, setIsComputing] = useState(false);
  const [result, setResult] = useState<ComputationResult | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const compute = async (
    operation: 'add' | 'subtract' | 'multiply' | 'divide',
    a: bigint,
    b: bigint
  ): Promise<ComputationResult> => {
    setIsComputing(true);
    setError(null);

    try {
      let value: bigint;

      switch (operation) {
        case 'add':
          value = a + b;
          break;
        case 'subtract':
          value = a - b;
          break;
        case 'multiply':
          value = a * b;
          break;
        case 'divide':
          value = a / b;
          break;
        default:
          throw new Error(`Unsupported operation: ${operation}`);
      }

      const computationResult: ComputationResult = {
        value,
        success: true,
        timestamp: Date.now()
      };

      setResult(computationResult);
      return computationResult;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsComputing(false);
    }
  };

  return {
    compute,
    isComputing,
    result,
    error
  };
}
