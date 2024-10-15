import { NextRequest, NextResponse } from "next/server";

export interface ITransaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
}

export const transactions: ITransaction[] = [
  { id: 1, date: new Date('2024-09-20'), description: 'Groceries', amount: 1200 },
  { id: 2, date: new Date('2024-09-21'), description: 'Rent', amount: 1500 },
  { id: 3, date: new Date('2024-09-22'), description: 'Utilities', amount: 300 },
  { id: 4, date: new Date('2024-09-23'), description: 'Internet', amount: 100 },
  { id: 5, date: new Date('2024-09-24'), description: 'Gas', amount: 80 },
  { id: 6, date: new Date('2024-09-25'), description: 'Dining Out', amount: 250 },
  { id: 7, date: new Date('2024-09-26'), description: 'Groceries', amount: 1300 },
  { id: 8, date: new Date('2024-09-27'), description: 'Clothing', amount: 400 },
  { id: 9, date: new Date('2024-09-28'), description: 'Entertainment', amount: 150 },
  { id: 10, date: new Date('2024-09-29'), description: 'Car Maintenance', amount: 220 },
  { id: 11, date: new Date('2024-09-30'), description: 'Gym Membership', amount: 60 },
  { id: 12, date: new Date('2024-10-01'), description: 'Medical Bills', amount: 200 },
  { id: 13, date: new Date('2024-10-02'), description: 'Household Supplies', amount: 170 },
  { id: 14, date: new Date('2024-10-03'), description: 'Subscriptions', amount: 45 },
  { id: 15, date: new Date('2024-10-04'), description: 'Pet Care', amount: 85 },
  { id: 16, date: new Date('2024-10-05'), description: 'Gifts', amount: 300 },
  { id: 17, date: new Date('2024-10-06'), description: 'Travel', amount: 800 },
  { id: 18, date: new Date('2024-10-07'), description: 'Home Repair', amount: 600 },
  { id: 19, date: new Date('2024-10-08'), description: 'Insurance', amount: 350 },
  { id: 20, date: new Date('2024-10-09'), description: 'School Supplies', amount: 120 },
  { id: 21, date: new Date('2024-10-10'), description: 'Fast Food', amount: 45 },
  { id: 22, date: new Date('2024-10-11'), description: 'Coffee', amount: 30 },
  { id: 23, date: new Date('2024-10-12'), description: 'Electronics', amount: 250 },
  { id: 24, date: new Date('2024-10-13'), description: 'Books', amount: 55 },
  { id: 25, date: new Date('2024-10-14'), description: 'Streaming Services', amount: 20 },
  { id: 26, date: new Date('2024-10-15'), description: 'Tickets', amount: 75 },
  { id: 27, date: new Date('2024-10-16'), description: 'Parking Fees', amount: 15 },
  { id: 28, date: new Date('2024-10-17'), description: 'Haircut', amount: 40 },
  { id: 29, date: new Date('2024-10-18'), description: 'Pharmacy', amount: 60 },
  { id: 30, date: new Date('2024-10-19'), description: 'Delivery', amount: 25 },
  { id: 31, date: new Date('2024-10-20'), description: 'Flowers', amount: 50 },
  { id: 32, date: new Date('2024-10-21'), description: 'Renters Insurance', amount: 100 },
  { id: 33, date: new Date('2024-10-22'), description: 'Vacation', amount: 1200 },
  { id: 34, date: new Date('2024-10-23'), description: 'Concert', amount: 90 },
  { id: 35, date: new Date('2024-10-24'), description: 'Beverages', amount: 30 },
  { id: 36, date: new Date('2024-10-25'), description: 'Catering', amount: 500 },
  { id: 37, date: new Date('2024-10-26'), description: 'Office Supplies', amount: 100 },
  { id: 38, date: new Date('2024-10-27'), description: 'Personal Care', amount: 80 },
  { id: 39, date: new Date('2024-10-28'), description: 'Cleaning Services', amount: 150 },
  { id: 40, date: new Date('2024-10-29'), description: 'Tax Preparation', amount: 250 },
  { id: 41, date: new Date('2024-10-30'), description: 'Home Security', amount: 200 },
  { id: 42, date: new Date('2024-10-31'), description: 'Music Lessons', amount: 300 },
  { id: 43, date: new Date('2024-11-01'), description: 'Art Supplies', amount: 90 },
  { id: 44, date: new Date('2024-11-02'), description: 'Mobile Phone', amount: 800 },
  { id: 45, date: new Date('2024-11-03'), description: 'Yoga Classes', amount: 120 },
  { id: 46, date: new Date('2024-11-04'), description: 'Tickets to Events', amount: 110 },
  { id: 47, date: new Date('2024-11-05'), description: 'Dinner', amount: 150 },
  { id: 48, date: new Date('2024-11-06'), description: 'Sports Equipment', amount: 200 },
  { id: 49, date: new Date('2024-11-07'), description: 'Gasoline', amount: 100 },
  { id: 50, date: new Date('2024-11-08'), description: 'Insurance Premium', amount: 300 },
];

export async function GET(request: NextRequest) {
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });

  return NextResponse.json(transactions, { status: 200 });
};
