import { ChangeEvent, ChangeEventHandler, useMemo, useState } from "react";

import { ITransaction } from "@/app/api/transactions/route";

type TransactionError = {
  cause: string;
  message: string;
};

enum TransactionSortDirection {
  asc = 'asc',
  desc = 'desc',
};

type TransactionSort = {
  field: keyof ITransaction;
  direction: TransactionSortDirection;
};

const useTransactions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [transactionError, setTransactionError] = useState<TransactionError>();
  const [transactionErrorOpened, setTransactionErrorOpened] = useState<boolean>(false);
  const [transactionSort, setTransactionSort] = useState<TransactionSort>();
  const [transactionDateStart, setTransactionDateStart] = useState<Date>(new Date());
  const [transactionDateEnd, setTransactionDateEnd] = useState<Date>();

  // memo manipulating
  const transactionsFiltered = useMemo(() => {
    let itemsFiltered = transactions;

    if (transactionSort) {
      itemsFiltered = itemsFiltered.sort((itemA, itemB) => {
        if (transactionSort.direction === TransactionSortDirection.asc) {
          return itemA[transactionSort.field] > itemB[transactionSort.field] ? -1 : 0;
        }
          
        return itemA[transactionSort.field] > itemB[transactionSort.field] ? 0 : -1;
      })
    }

    if (!transactionDateStart || !transactionDateEnd) {
      return itemsFiltered;
    }

    itemsFiltered = transactions.filter(item => {
      return item.date >= new Date(transactionDateStart) && item.date <= new Date(transactionDateEnd);
    });

    return itemsFiltered;
  }, [transactionSort, transactionDateStart, transactionDateEnd, transactions]);

  const transactionSortKey = useMemo(() => `${transactionSort?.field}-${transactionSort?.direction}`, [transactionSort]);

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

  const handleTransactionSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = event.target.value.split('-');

    setTransactionSort({
      field: field as keyof ITransaction,
      direction: direction as TransactionSortDirection
    });
  };

  return {
    loading,
    setLoading,
    transactionError,
    setTransactionError,
    transactionErrorOpened,
    setTransactionErrorOpened,
    transactionSort,
    handleTransactionSort,
    transactionSortKey,
    transactionDateStart,
    setTransactionDateStart,
    transactionDateEnd,
    setTransactionDateEnd,
    getAllTransactions,
    transactions: transactionsFiltered,
  }
};

export default useTransactions;
