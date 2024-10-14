import { NextRequest, NextResponse } from "next/server";

export interface ITransaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
}

export const transactions: ITransaction[] = [
  {
    id: "1",
    date: new Date('2024-10-20'),
    description: 'Groceries',
    amount: 1200
  },
  {
    id: "2",
    date: new Date('2024-10-20'),
    description: 'Groceries',
    amount: 1200
  },
  {
    id: "3",
    date: new Date('2024-10-20'),
    description: 'Groceries',
    amount: 1200
  }
];

export async function GET(request: NextRequest) {
  return NextResponse.json(transactions, { status: 200 });
};
