/**
 * Validation Utilities
 * Input validation and data verification
 */

export function isValidChainId(chainId: number): boolean {
  return chainId > 0 && Number.isInteger(chainId);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidContractAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidHandle(handle: string): boolean {
  return /^0x[a-fA-F0-9]+$/.test(handle);
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateEncryptionInput(
  type: string,
  value: any
): ValidationResult {
  switch (type) {
    case 'bool':
      if (typeof value !== 'boolean') {
        return { valid: false, error: 'Value must be a boolean' };
      }
      break;

    case 'uint8':
    case 'uint16':
    case 'uint32':
    case 'uint64':
      const num = typeof value === 'bigint' ? value : BigInt(value);
      const maxValues = {
        uint8: 255n,
        uint16: 65535n,
        uint32: 4294967295n,
        uint64: 18446744073709551615n
      };

      if (num < 0n || num > maxValues[type as keyof typeof maxValues]) {
        return { valid: false, error: `Value out of range for ${type}` };
      }
      break;

    case 'address':
      if (!isValidContractAddress(value)) {
        return { valid: false, error: 'Invalid Ethereum address' };
      }
      break;

    default:
      return { valid: false, error: `Unsupported type: ${type}` };
  }

  return { valid: true };
}
