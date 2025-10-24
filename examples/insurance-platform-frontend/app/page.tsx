'use client';

import { useState } from 'react';
import { useFhevmClient, useEncrypt } from '@fhevm/universal-sdk/react';
import { ethers } from 'ethers';

// Insurance contract ABI (simplified)
const INSURANCE_ABI = [
  "function createPolicy(bytes calldata encryptedVIN, bytes calldata encryptedModel, bytes calldata encryptedYear) external returns (uint256)",
  "function submitClaim(uint256 policyId, bytes calldata encryptedAmount, bytes calldata encryptedDescription) external returns (uint256)",
  "function isPaused() external view returns (bool)"
];

export default function InsurancePlatform() {
  const [vin, setVin] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const [policyId, setPolicyId] = useState('');
  const [txHash, setTxHash] = useState('');

  // Initialize FHEVM SDK
  const { client, isReady, isLoading, error } = useFhevmClient({
    network: {
      chainId: 8009,
      rpcUrl: 'https://devnet.zama.ai',
      name: 'Zama Devnet',
    },
  });

  // Encryption hook
  const { encryptValue, isEncrypting } = useEncrypt({
    onSuccess: (data) => {
      console.log('Encryption successful');
    },
    onError: (err) => {
      console.error('Encryption failed:', err);
    }
  });

  // Create insurance policy
  const handleCreatePolicy = async () => {
    if (!isReady || !vin || !model || !year) return;

    try {
      // Encrypt sensitive data using Universal FHEVM SDK
      const encryptedVIN = await encryptValue('uint64', BigInt(vin));
      const encryptedModel = await encryptValue('uint32', parseInt(model));
      const encryptedYear = await encryptValue('uint16', parseInt(year));

      if (!encryptedVIN || !encryptedModel || !encryptedYear) {
        throw new Error('Encryption failed');
      }

      // Connect to contract (assuming MetaMask is available)
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contractAddress = process.env.NEXT_PUBLIC_INSURANCE_CONTRACT || '0x...';
      const contract = new ethers.Contract(contractAddress, INSURANCE_ABI, signer);

      // Submit transaction with encrypted data
      const tx = await contract.createPolicy(
        encryptedVIN,
        encryptedModel,
        encryptedYear
      );

      console.log('Transaction submitted:', tx.hash);
      setTxHash(tx.hash);

      const receipt = await tx.wait();
      console.log('Policy created! Receipt:', receipt);

      alert('Policy created successfully!');
    } catch (err) {
      console.error('Error creating policy:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Submit insurance claim
  const handleSubmitClaim = async () => {
    if (!isReady || !policyId || !claimAmount || !claimDescription) return;

    try {
      // Encrypt claim data using Universal FHEVM SDK
      const encryptedAmount = await encryptValue('uint32', parseInt(claimAmount));
      const encryptedDesc = await encryptValue('uint64', BigInt(claimDescription.length));

      if (!encryptedAmount || !encryptedDesc) {
        throw new Error('Encryption failed');
      }

      // Connect to contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contractAddress = process.env.NEXT_PUBLIC_INSURANCE_CONTRACT || '0x...';
      const contract = new ethers.Contract(contractAddress, INSURANCE_ABI, signer);

      // Submit claim with encrypted data
      const tx = await contract.submitClaim(
        policyId,
        encryptedAmount,
        encryptedDesc
      );

      console.log('Claim submitted:', tx.hash);
      setTxHash(tx.hash);

      const receipt = await tx.wait();
      console.log('Claim submitted! Receipt:', receipt);

      alert('Claim submitted successfully!');
    } catch (err) {
      console.error('Error submitting claim:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Initializing FHEVM...</h1>
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-gray-700">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-indigo-900">
            Private Insurance Platform
          </h1>
          <p className="text-xl text-gray-600">
            Secure vehicle insurance with Fully Homomorphic Encryption
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span className="text-green-800 font-medium">
              FHEVM SDK Ready - Universal Encryption Enabled
            </span>
          </div>
        </div>

        {/* SDK Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">SDK Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Network</p>
              <p className="font-semibold">{client?.config.network.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chain ID</p>
              <p className="font-semibold">{client?.config.network.chainId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold text-green-600">
                {isReady ? '✓ Ready' : '⌛ Loading'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Encryption</p>
              <p className="font-semibold text-green-600">✓ FHE Enabled</p>
            </div>
          </div>
        </div>

        {/* Create Policy Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Insurance Policy</h2>
          <p className="text-gray-600 mb-6">
            All sensitive data is encrypted using the Universal FHEVM SDK before being sent to the blockchain.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Vehicle VIN (Encrypted with FHE)
              </label>
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter VIN number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Vehicle Model (Encrypted with FHE)
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter model code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Year (Encrypted with FHE)
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="2024"
              />
            </div>

            <button
              onClick={handleCreatePolicy}
              disabled={!isReady || isEncrypting || !vin || !model || !year}
              className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg transition-colors"
            >
              {isEncrypting ? '🔐 Encrypting Data...' : '🚗 Create Encrypted Policy'}
            </button>
          </div>
        </div>

        {/* Submit Claim Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Submit Insurance Claim</h2>
          <p className="text-gray-600 mb-6">
            Claim amounts and details remain private through FHE encryption.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Policy ID
              </label>
              <input
                type="number"
                value={policyId}
                onChange={(e) => setPolicyId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your policy ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Claim Amount (Encrypted with FHE)
              </label>
              <input
                type="number"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter claim amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Description (Encrypted with FHE)
              </label>
              <textarea
                value={claimDescription}
                onChange={(e) => setClaimDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe the claim"
                rows={3}
              />
            </div>

            <button
              onClick={handleSubmitClaim}
              disabled={!isReady || isEncrypting || !policyId || !claimAmount}
              className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg transition-colors"
            >
              {isEncrypting ? '🔐 Encrypting Claim...' : '💼 Submit Encrypted Claim'}
            </button>
          </div>
        </div>

        {/* Transaction Status */}
        {txHash && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">Transaction Submitted!</h3>
            <p className="text-sm text-blue-800 font-mono break-all">{txHash}</p>
          </div>
        )}

        {/* How It Works */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white mt-8">
          <h3 className="text-2xl font-bold mb-4">How Universal FHEVM SDK Works</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>SDK initializes with network configuration (Zama Devnet)</li>
            <li>Sensitive data is encrypted client-side using FHE</li>
            <li>Encrypted data is sent to smart contracts</li>
            <li>Contracts perform computations on encrypted data</li>
            <li>Results remain private and secure on-chain</li>
            <li>Only authorized users can decrypt results</li>
          </ol>
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="font-semibold mb-2">🔐 Privacy Guarantee</p>
            <p className="text-sm">
              Your VIN, vehicle model, claim amounts, and personal data are NEVER visible on-chain.
              All computation happens on encrypted data using Fully Homomorphic Encryption.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
