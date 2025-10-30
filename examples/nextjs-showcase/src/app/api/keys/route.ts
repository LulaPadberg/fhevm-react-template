/**
 * Keys API Route
 * Provides public key information
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'Public key is fetched automatically by the SDK',
      network: {
        chainId: 8009,
        name: 'Zama Devnet',
        publicKeyUrl: 'https://devnet.zama.ai/fhe-keys'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
