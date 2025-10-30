/**
 * Security Utilities
 * Helper functions for secure operations
 */

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>'"]/g, '');
}

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function validateNumber(value: string, type: 'uint8' | 'uint16' | 'uint32' | 'uint64'): boolean {
  const num = BigInt(value);

  switch (type) {
    case 'uint8':
      return num >= 0n && num <= 255n;
    case 'uint16':
      return num >= 0n && num <= 65535n;
    case 'uint32':
      return num >= 0n && num <= 4294967295n;
    case 'uint64':
      return num >= 0n && num <= 18446744073709551615n;
    default:
      return false;
  }
}

export function toHex(data: Uint8Array): string {
  return '0x' + Array.from(data)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function fromHex(hex: string): Uint8Array {
  const cleaned = hex.replace(/^0x/, '');
  const bytes = new Uint8Array(cleaned.length / 2);

  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = parseInt(cleaned.slice(i, i + 2), 16);
  }

  return bytes;
}
