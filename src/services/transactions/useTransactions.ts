import { ChangeEvent, useCallback, useMemo, useState } from "react";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [transactionError, setTransactionError] = useState<TransactionError>();
  const [transactionErrorOpened, setTransactionErrorOpened] = useState<boolean>(false);
  const [transactionSort, setTransactionSort] = useState<TransactionSort>();
  const [transactionDateStart, setTransactionDateStart] = useState<Date>(new Date());
  const [transactionDateEnd, setTransactionDateEnd] = useState<Date>();
  const [transactionPage, setTransactionPage] = useState<number>(1);
  const [transactionPageSize, setTransactionPageSize] = useState<number>(5);

  const splitIntoPages = <T>(items: T[], page: number, pageSize: number): T[] => {
    return items.slice((page - 1) * pageSize, page * pageSize);
  }

  const transactionsFiltered: ITransaction[] = useMemo(() => {
    let itemsFiltered = transactions;

    if (transactionSort) {
      itemsFiltered = itemsFiltered.sort((itemA, itemB) => {
        if (transactionSort.direction === TransactionSortDirection.asc) {
          return itemA[transactionSort.field] > itemB[transactionSort.field] ? -1 : 0;
        }
          
        return itemA[transactionSort.field] > itemB[transactionSort.field] ? 0 : -1;
      })
    }

    if (transactionDateStart && transactionDateEnd) {
      itemsFiltered = transactions.filter(item => {
        return new Date(item.date) >= new Date(transactionDateStart) && new Date(item.date) <= new Date(transactionDateEnd);
      });
    }

    return itemsFiltered;
  }, [transactionPage, transactionPageSize, transactionSort, transactionDateStart, transactionDateEnd, transactions]);

  const transactionsPaginated: ITransaction[] = useMemo(() => {
    return splitIntoPages<ITransaction>(transactionsFiltered, transactionPage, transactionPageSize)
  }, [transactionsFiltered, transactionPage, transactionPageSize, transactionSort])

  const transactionAmount = useMemo(() => transactionsFiltered.reduce((pV, cV) => pV + cV.amount, 0), [transactionsFiltered]);
  const transactionSortKey = useMemo(() => `${transactionSort?.field}-${transactionSort?.direction}`, [transactionSort]);
  const transactionTotalPages = useMemo(() => Math.ceil(transactionsFiltered.length / transactionPageSize), [transactionsFiltered, transactionPageSize]);

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

  const handleTransactionPageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = Number(event.target.value);

    setTransactionPage(1);
    setTransactionPageSize(pageSize);
  };

  const handleTransactionDateStart = (date: Date) => {
    setTransactionPage(1);
    setTransactionDateStart(date);
  }

  const handleTransactionDateEnd = (date: Date) => {
    setTransactionPage(1);
    setTransactionDateEnd(date);
  }

  const goToPreviousTransactionPage = () => {
    if (!canGoToPreviousTransactionPage) return;

    setTransactionPage((previousTransactionPage => previousTransactionPage - 1));
  };

  const goToNextTransactionPage = () => {
    if (!canGoToNextTransactionPage) return;

    setTransactionPage((previousTransactionPage => previousTransactionPage + 1));
  };

  const goToTransactionPage = (page: number) => {
    if (!canGoToTransactionPage) return;

    setTransactionPage(page);
  };

  const canGoToTransactionPage = useCallback((page: number) => {
    return Boolean(splitIntoPages(transactionsFiltered, page, transactionPageSize).length);
  }, [transactionsFiltered, transactionPageSize]);

  const canGoToPreviousTransactionPage = useMemo(() => {
    return canGoToTransactionPage(transactionPage - 1);
  }, [transactionPage, transactionPageSize]);


  const canGoToNextTransactionPage = useMemo(() => {
    return canGoToTransactionPage(transactionPage + 1);
  }, [transactionPage, transactionPageSize]);

  return {
    loading,
    setLoading,
    transactionError,
    setTransactionError,
    transactionErrorOpened,
    setTransactionErrorOpened,
    transactionAmount,
    transactionPage,
    transactionTotalPages,
    goToTransactionPage,
    goToPreviousTransactionPage,
    goToNextTransactionPage,
    canGoToTransactionPage,
    canGoToPreviousTransactionPage,
    canGoToNextTransactionPage,
    transactionPageSize,
    handleTransactionPageSize,
    setTransactionPageSize,
    transactionSort,
    handleTransactionSort,
    transactionSortKey,
    transactionDateStart,
    handleTransactionDateStart,
    transactionDateEnd,
    handleTransactionDateEnd,
    getAllTransactions,
    transactions: transactionsFiltered,
    transactionsPaginated: transactionsPaginated,
  }
};

export default useTransactions;
