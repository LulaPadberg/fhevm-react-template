/**
 * Computation API Route
 * Server-side FHE computations
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { operation, operandA, operandB } = await request.json();

    if (!operation || !operandA || !operandB) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'FHE computations are performed on-chain',
      operation,
      hint: 'Send encrypted values to your smart contract for computation'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
