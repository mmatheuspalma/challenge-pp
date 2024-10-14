"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useTransactions from "@/services/transactions/useTransactions";
import { ITransaction } from "./api/transactions/route";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const transactionsService = useTransactions();

  const getAllTransactions = async () => {
    setLoading(true);

    try {
      const items = await transactionsService.getTransactions({});

      setTransactions(items);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllTransactions();
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {
          transactions.map((t, index) => (
            <div className="w-[200px] h-[100px] bg-white rounded" key={index}>
              {t.id} - {t.amount}
            </div>
          ))
        }
      </main>
    </div>
  );
}
