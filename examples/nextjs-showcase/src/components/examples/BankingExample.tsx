/**
 * Banking Example Component
 * Demonstrates private banking operations with FHE
 */

'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm/universal-sdk/react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function BankingExample() {
  const [balance, setBalance] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [encryptedBalance, setEncryptedBalance] = useState('');

  const { encryptValue, isEncrypting } = useEncrypt({
    onSuccess: (data) => {
      const hex = '0x' + Array.from(data.data).map(b => b.toString(16).padStart(2, '0')).join('');
      setEncryptedBalance(hex);
    }
  });

  const handleEncryptBalance = async () => {
    if (!balance) return;
    await encryptValue('uint64', parseInt(balance));
  };

  return (
    <Card title="Private Banking Example">
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-md">
          <h4 className="font-semibold mb-2">Use Case</h4>
          <p className="text-sm text-gray-700">
            Encrypt sensitive financial data like account balances and transaction amounts.
            Perform operations on encrypted data while maintaining complete privacy.
          </p>
        </div>

        <Input
          label="Account Balance ($)"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="10000"
          helperText="Enter your account balance"
        />

        <Input
          label="Transfer Amount ($)"
          type="number"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          placeholder="500"
          helperText="Amount to transfer privately"
        />

        <Button
          onClick={handleEncryptBalance}
          disabled={isEncrypting || !balance}
          className="w-full"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Balance'}
        </Button>

        {encryptedBalance && (
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="font-medium mb-2">Encrypted Balance:</p>
            <p className="text-xs font-mono break-all text-gray-700">
              {encryptedBalance}
            </p>
            <p className="text-sm text-green-600 mt-2">
              ✓ Your balance is now encrypted and ready for private transactions
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
