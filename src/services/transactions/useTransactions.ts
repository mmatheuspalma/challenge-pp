import { ITransaction } from "@/app/api/transactions/route";

const useTransactions = () => {
  const getTransaction = async (transactionId: ITransaction['id']) => {
    return (await fetch(`http://localhost:3000/api/transactions/${transactionId}`)).json();
  }

  const getTransactions = async (filters: any) => {
    return (await fetch('http://localhost:3000/api/transactions', filters)).json();
  }

  return {
    getTransaction,
    getTransactions,
  }
};

export default useTransactions;
