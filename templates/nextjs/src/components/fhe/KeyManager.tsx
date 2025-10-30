/**
 * Key Manager Component
 * UI for managing FHE keys
 */

'use client';

import { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { KeyManager as KeyManagerLib } from '../../lib/fhe/keys';

export function KeyManager() {
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHasKey(KeyManagerLib.hasPublicKey());
  }, []);

  const handleLoadKey = async () => {
    setLoading(true);
    try {
      await KeyManagerLib.getPublicKey();
      setHasKey(true);
    } catch (error) {
      console.error('Failed to load key:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearKeys = () => {
    KeyManagerLib.clearKeys();
    setHasKey(false);
  };

  return (
    <Card title="Key Management">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
          <div>
            <p className="font-medium">Public Key Status</p>
            <p className="text-sm text-gray-600">
              {hasKey ? 'Loaded' : 'Not loaded'}
            </p>
          </div>
          <div className={`w-3 h-3 rounded-full ${hasKey ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleLoadKey}
            disabled={loading || hasKey}
            className="flex-1"
          >
            {loading ? 'Loading...' : 'Load Key'}
          </Button>

          <Button
            onClick={handleClearKeys}
            disabled={!hasKey}
            variant="secondary"
            className="flex-1"
          >
            Clear Keys
          </Button>
        </div>
      </div>
    </Card>
  );
}
