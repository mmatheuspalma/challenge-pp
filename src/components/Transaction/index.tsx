import { ITransaction } from "@/app/api/transactions/route";

import { currencyFormater } from "@/utils/formater";

interface ITransactionProps extends ITransaction {}

export const Transaction = ({ id, description, amount, date }: ITransactionProps) => {
  return (
    <div className="w-[100%] h-auto bg-white rounded text-[#333] text-[16px] p-4">
      <div className="text-[20px]">
        #{id}
      </div>
      <div>
        {description}
      </div>
      <div>
        {currencyFormater.format(amount)}
      </div>
      <div>
        Created at <strong>{new Date(date).toDateString()}</strong>
      </div>
    </div>
  )
}

export default Transaction;
