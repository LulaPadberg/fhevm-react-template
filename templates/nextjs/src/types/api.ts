/**
 * API Type Definitions
 * Types for API requests and responses
 */

export interface EncryptRequest {
  type: 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'address';
  value: any;
}

export interface EncryptResponse {
  encrypted: string;
  success: boolean;
  error?: string;
}

export interface DecryptRequest {
  contractAddress: string;
  handle: string;
}

export interface DecryptResponse {
  value: string;
  success: boolean;
  error?: string;
}

export interface ComputeRequest {
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  operandA: string;
  operandB: string;
}

export interface ComputeResponse {
  result: string;
  success: boolean;
  error?: string;
}

export interface ApiError {
  error: string;
  code: string;
  details?: any;
}
