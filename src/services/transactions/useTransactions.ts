import { useMemo, useState } from "react";

import { ITransaction } from "@/app/api/transactions/route";

type TransactionError = {
  cause: string;
  message: string;
};

type TransactionFilter = {
  field: string;
  value: string;
};

const useTransactions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [transactionError, setTransactionError] = useState<TransactionError>();
  const [transactionErrorOpened, setTransactionErrorOpened] = useState<boolean>(false);
  const [transactionFilters, setTransactionFilters] = useState<TransactionFilter>();
  const [transactionDateStart, setTransactionDateStart] = useState<Date>(new Date());
  const [transactionDateEnd, setTransactionDateEnd] = useState<Date>();

  // memo manipulating
  const transactionsFiltered = useMemo(() => {
    if (!transactionDateStart || !transactionDateEnd) {
      return transactions;
    }

    return transactions.filter((t: ITransaction) => {
      return t.date >= new Date(transactionDateStart) && t.date <= new Date(transactionDateEnd);
    })
  }, [transactionDateStart, transactionDateEnd, transactions]);

  const getTransactionsList = async (): Promise<ITransaction[]> => {
    return await (await fetch('/api/transactions')).json();
  }

  const getAllTransactions = async (forcedApiError: boolean = false): Promise<ITransaction[] | void> => {
    setLoading(true);

    try {
      if (forcedApiError) {
        setTransactions([]);
        throw new Error('Forced Error', {
          cause: 'the getAllTransactions method was forced to return an error'
        });
      }

      const items = await getTransactionsList();

      setTransactions(items);

      return items;
    } catch (error) {
      if (error instanceof Error) {
        setTransactionError({
          cause: error.cause as string,
          message: error.message,
        });
      } else {
        setTransactionError({
          cause: 'getAllTransactions had an generic error',
          message: 'Error'
        })
      }

      setTransactionErrorOpened(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    transactionError,
    setTransactionError,
    transactionErrorOpened,
    setTransactionErrorOpened,
    transactionFilters,
    setTransactionFilters,
    transactionDateStart,
    setTransactionDateStart,
    transactionDateEnd,
    setTransactionDateEnd,
    getAllTransactions,
    transactions: transactionsFiltered,
  }
};

export default useTransactions;
