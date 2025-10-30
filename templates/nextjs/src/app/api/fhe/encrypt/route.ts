/**
 * Encryption API Route
 * Note: Encryption should be done client-side
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'Encryption must be performed client-side using the Universal FHEVM SDK',
    hint: 'Use useEncrypt() hook or encrypt() function from @fhevm/universal-sdk'
  }, { status: 400 });
}
