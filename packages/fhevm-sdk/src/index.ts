/**
 * @fhevm/universal-sdk
 *
 * A universal, framework-agnostic SDK for building confidential frontends with FHEVM.
 * Provides a wagmi-like interface for easy integration with any web3 frontend.
 */

export * from './core';
export * from './types';
export * from './utils';
export * from './hooks';

// Re-export fhevmjs for convenience
export { createInstance } from 'fhevmjs';
