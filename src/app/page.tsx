"use client";

import { useEffect, useState } from "react";

import useTransactions from "@/services/transactions/useTransactions";

import Modal from "@/components/Modal";
import Filter from "@/components/Filter";
import Transaction from "@/components/Transaction";
import Pagination from "@/components/Pagination";

export default function Home() {
  const {
    loading,
    setLoading,
    transactions,
    transactionTotalPages,
    transactionError,
    transactionErrorOpened,
    setTransactionErrorOpened,
    transactionPage,
    transactionPageSize,
    handleTransactionPageSize,
    goToTransactionPage,
    goToPreviousTransactionPage,
    goToNextTransactionPage,
    canGoToTransactionPage,
    canGoToPreviousTransactionPage,
    canGoToNextTransactionPage,
    handleTransactionSort,
    transactionSortKey,
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
        <Filter
          forcedApiError={forcedApiError}
          setForcedApiError={setForcedApiError}
          transactionSortKey={transactionSortKey}
          handleTransactionSort={handleTransactionSort}
          transactionDateStart={transactionDateStart}
          setTransactionDateStart={setTransactionDateStart}
          transactionDateEnd={transactionDateEnd}
          setTransactionDateEnd={setTransactionDateEnd}
          transactionPageSize={transactionPageSize}
          handleTransactionPageSize={handleTransactionPageSize}
        />
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
          <Pagination
            transactionPage={transactionPage}
            transactionTotalPages={transactionTotalPages}
            goToTransactionPage={goToTransactionPage}
            canGoToTransactionPage={canGoToTransactionPage}
            goToPreviousTransactionPage={goToPreviousTransactionPage}
            canGoToPreviousTransactionPage={canGoToPreviousTransactionPage}
            goToNextTransactionPage={goToNextTransactionPage}
            canGoToNextTransactionPage={canGoToNextTransactionPage}
          />
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
