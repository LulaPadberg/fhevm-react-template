/**
 * Encryption Demo Component
 * Demonstrates FHE encryption capabilities
 */

'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm/universal-sdk/react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export function EncryptionDemo() {
  const [value, setValue] = useState('');
  const [type, setType] = useState<'uint8' | 'uint16' | 'uint32'>('uint32');
  const [encryptedResult, setEncryptedResult] = useState('');

  const { encryptValue, isEncrypting } = useEncrypt({
    onSuccess: (data) => {
      const hex = '0x' + Array.from(data.data).map(b => b.toString(16).padStart(2, '0')).join('');
      setEncryptedResult(hex);
    }
  });

  const handleEncrypt = async () => {
    if (!value) return;
    await encryptValue(type, parseInt(value));
  };

  return (
    <Card title="Encryption Demo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Value Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="uint8">uint8 (0-255)</option>
            <option value="uint16">uint16 (0-65535)</option>
            <option value="uint32">uint32 (0-4294967295)</option>
          </select>
        </div>

        <Input
          label="Value to Encrypt"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
        />

        <Button
          onClick={handleEncrypt}
          disabled={isEncrypting || !value}
          className="w-full"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt'}
        </Button>

        {encryptedResult && (
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="font-medium mb-2">Encrypted Result:</p>
            <p className="text-sm font-mono break-all text-gray-700">
              {encryptedResult}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
