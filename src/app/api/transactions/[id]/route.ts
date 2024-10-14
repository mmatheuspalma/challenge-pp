import { NextRequest, NextResponse } from "next/server";
import { transactions } from "../route";

export async function GET(request: NextRequest) {
  console.log(request);

  const transactionId = request.nextUrl.searchParams.get('transactionId');

  const transaction = transactions.find((t) => t.id === transactionId);

  return NextResponse.json(transaction, { status: 200 });
}