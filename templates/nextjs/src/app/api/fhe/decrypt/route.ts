/**
 * Decryption API Route
 * Handles decryption requests via gateway
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { contractAddress, handle } = await request.json();

    if (!contractAddress || !handle) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Use useDecrypt() hook for client-side decryption',
      contractAddress,
      handle
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
