import { NextRequest, NextResponse } from "next/server";

export interface ITransaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
}

export const transactions: ITransaction[] = [
  {
    id: 1,
    date: new Date('2024-09-20'),
    description: 'Groceries',
    amount: 1200
  },
  {
    id: 2,
    date: new Date('2024-08-10'),
    description: 'Groceries',
    amount: 1130.4
  },
  {
    id: 3,
    date: new Date('2024-04-10'),
    description: 'Groceries',
    amount: 1200
  },
  {
    id: 4,
    date: new Date('2024-05-20'),
    description: 'Groceries',
    amount: 231.45
  },
  {
    id: 5,
    date: new Date('2024-11-30'),
    description: 'Groceries',
    amount: 2231.45
  },
  {
    id: 6,
    date: new Date('2024-12-04'),
    description: 'Groceries',
    amount: 531.45
  },
  {
    id: 7,
    date: new Date('2024-12-28'),
    description: 'Groceries',
    amount: 664.25
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(transactions, { status: 200 });
};
