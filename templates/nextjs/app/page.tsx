'use client';

import { useState } from 'react';
import { useFhevmClient, useEncrypt, useDecrypt } from '@fhevm/universal-sdk/react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [encryptedResult, setEncryptedResult] = useState<string>('');

  // Initialize FHEVM client
  const { client, isLoading, error, isReady } = useFhevmClient({
    network: {
      chainId: 8009,
      rpcUrl: 'https://devnet.zama.ai',
      name: 'Zama Devnet',
    },
  });

  // Encryption hook
  const { encryptValue, isEncrypting } = useEncrypt({
    onSuccess: (data) => {
      const hex = '0x' + Array.from(data.data).map(b => b.toString(16).padStart(2, '0')).join('');
      setEncryptedResult(hex);
    },
  });

  // Decryption hook
  const { decryptValue, isDecrypting, result } = useDecrypt({
    onSuccess: (result) => {
      console.log('Decrypted value:', result.value);
    },
  });

  const handleEncrypt = async () => {
    if (!inputValue) return;
    await encryptValue('uint32', parseInt(inputValue));
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Initializing FHEVM...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-gray-700">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Universal FHEVM SDK Demo
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Status</h2>
          <div className="space-y-2">
            <p className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-2 ${isReady ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="font-medium">FHEVM Client:</span>
              <span className="ml-2">{isReady ? 'Ready' : 'Not Ready'}</span>
            </p>
            <p>
              <span className="font-medium">Network:</span>
              <span className="ml-2">{client?.config.network.name}</span>
            </p>
            <p>
              <span className="font-medium">Chain ID:</span>
              <span className="ml-2">{client?.config.network.chainId}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Encrypt a Number</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter a number (uint32):
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12345"
              />
            </div>

            <button
              onClick={handleEncrypt}
              disabled={!isReady || isEncrypting || !inputValue}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {isEncrypting ? 'Encrypting...' : 'Encrypt'}
            </button>

            {encryptedResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <p className="font-medium mb-2">Encrypted Result:</p>
                <p className="text-sm font-mono break-all text-gray-700">
                  {encryptedResult}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">How It Works</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>SDK initializes FHEVM client with network configuration</li>
            <li>Enter a number and click "Encrypt"</li>
            <li>Value is encrypted using FHE on the client side</li>
            <li>Encrypted data can be sent to smart contracts</li>
            <li>Computations happen on encrypted data</li>
            <li>Results can be decrypted with proper authorization</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
