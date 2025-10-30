/**
 * Computation Demo Component
 * Demonstrates FHE computation on encrypted data
 */

'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { useComputation } from '../../hooks/useComputation';

export function ComputationDemo() {
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');

  const { compute, isComputing, result } = useComputation();

  const handleCompute = async () => {
    if (!valueA || !valueB) return;
    await compute(operation, BigInt(valueA), BigInt(valueB));
  };

  return (
    <Card title="Computation Demo">
      <div className="space-y-4">
        <Input
          label="Value A"
          type="number"
          value={valueA}
          onChange={(e) => setValueA(e.target.value)}
          placeholder="Enter first number"
        />

        <div>
          <label className="block text-sm font-medium mb-2">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (-)</option>
            <option value="multiply">Multiplication (×)</option>
            <option value="divide">Division (÷)</option>
          </select>
        </div>

        <Input
          label="Value B"
          type="number"
          value={valueB}
          onChange={(e) => setValueB(e.target.value)}
          placeholder="Enter second number"
        />

        <Button
          onClick={handleCompute}
          disabled={isComputing || !valueA || !valueB}
          className="w-full"
        >
          {isComputing ? 'Computing...' : 'Compute'}
        </Button>

        {result && (
          <div className="p-4 bg-green-50 rounded-md border border-green-200">
            <p className="font-medium mb-2">Result:</p>
            <p className="text-2xl font-bold text-green-700">
              {result.value.toString()}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
