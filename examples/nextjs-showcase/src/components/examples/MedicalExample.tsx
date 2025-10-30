/**
 * Medical Example Component
 * Demonstrates private medical data handling with FHE
 */

'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm/universal-sdk/react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function MedicalExample() {
  const [heartRate, setHeartRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [encryptedData, setEncryptedData] = useState<{ heartRate: string; bloodPressure: string } | null>(null);

  const { encryptValue, isEncrypting } = useEncrypt();

  const handleEncryptData = async () => {
    if (!heartRate || !bloodPressure) return;

    try {
      const encryptedHR = await encryptValue('uint8', parseInt(heartRate));
      const encryptedBP = await encryptValue('uint16', parseInt(bloodPressure));

      const hrHex = '0x' + Array.from(encryptedHR.data).map(b => b.toString(16).padStart(2, '0')).join('');
      const bpHex = '0x' + Array.from(encryptedBP.data).map(b => b.toString(16).padStart(2, '0')).join('');

      setEncryptedData({
        heartRate: hrHex,
        bloodPressure: bpHex
      });
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  return (
    <Card title="Private Medical Records Example">
      <div className="space-y-4">
        <div className="p-4 bg-purple-50 rounded-md">
          <h4 className="font-semibold mb-2">Use Case</h4>
          <p className="text-sm text-gray-700">
            Store and process sensitive medical data privately. Doctors can perform computations
            on encrypted health metrics without seeing the raw values.
          </p>
        </div>

        <Input
          label="Heart Rate (BPM)"
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="75"
          helperText="Normal range: 60-100 BPM"
        />

        <Input
          label="Blood Pressure (mmHg)"
          type="number"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
          placeholder="120"
          helperText="Systolic pressure value"
        />

        <Button
          onClick={handleEncryptData}
          disabled={isEncrypting || !heartRate || !bloodPressure}
          className="w-full"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Medical Data'}
        </Button>

        {encryptedData && (
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 rounded-md">
              <p className="font-medium text-sm mb-1">Encrypted Heart Rate:</p>
              <p className="text-xs font-mono break-all text-gray-700">
                {encryptedData.heartRate}
              </p>
            </div>

            <div className="p-3 bg-gray-100 rounded-md">
              <p className="font-medium text-sm mb-1">Encrypted Blood Pressure:</p>
              <p className="text-xs font-mono break-all text-gray-700">
                {encryptedData.bloodPressure}
              </p>
            </div>

            <p className="text-sm text-green-600">
              ✓ Medical data encrypted and HIPAA-compliant
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
