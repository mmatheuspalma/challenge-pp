"use client";

import { useEffect, useState } from "react";

import useTransactions from "@/services/transactions/useTransactions";

import Modal from "@/components/Modal";
import Transaction from "@/components/Transaction";
import Datepicker from "@/components/DatePicker";

export default function Home() {
  const {
    loading,
    setLoading,
    transactions,
    transactionError,
    transactionErrorOpened,
    setTransactionErrorOpened,
    getAllTransactions,
    transactionDateStart,
    setTransactionDateStart,
    transactionDateEnd,
    setTransactionDateEnd,
  } = useTransactions();

  const [forcedApiError, setForcedApiError] = useState<boolean>(false);

  useEffect(() => {
    getAllTransactions(forcedApiError);
  }, [forcedApiError])

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-[100%]">
        <div className="w-[100%] mb-4 flex flex-row space-between">
          <button
            className={`${forcedApiError ? 'bg-[red]' : 'bg-[blue]'} text-white py-2 px-4 rounded`}
            onClick={() => setForcedApiError(!forcedApiError)}
          >
            Force API Error
          </button>
          {transactionDateStart?.toDateString()}
          {transactionDateEnd?.toDateString()}
          <Datepicker
            startDate={transactionDateStart}
            endDate={transactionDateEnd}
            onChangeStartDate={setTransactionDateStart}
            onChangeEndDate={setTransactionDateEnd}
            multiple
          />
        </div>
        <div className="flex flex-col gap-4">
          {
            transactions.length ?
              transactions.map((t, index) => (
                <Transaction
                  key={index}
                  id={t.id}
                  description={t.description}
                  amount={t.amount}
                  date={t.date}
                />
              ))
            : (
              <div>
                Oops, empty list!
              </div>
            )
          }
        </div>
        {
          transactionError && (
            <Modal
              close={() => setTransactionErrorOpened(false)}
              isOpen={transactionErrorOpened}
              title={transactionError.message}
              description={transactionError.cause}
            />
          )
        }
      </main>
    </div>
  );
}
