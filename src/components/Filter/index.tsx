import { ChangeEvent } from "react";

import Datepicker from "../DatePicker";

interface IFilterProps {
  forcedApiError: boolean;
  transactionSortKey: string;
  handleTransactionSort: (event: ChangeEvent<HTMLSelectElement>) => void;
  setForcedApiError: Function;
  transactionDateStart: Date;
  setTransactionDateStart: Function;
  transactionDateEnd?: Date;
  setTransactionDateEnd?: Function;
  transactionPageSize: number;
  handleTransactionPageSize: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Filter = ({
  forcedApiError,
  transactionSortKey,
  handleTransactionSort,
  setForcedApiError,
  transactionDateStart,
  setTransactionDateStart,
  transactionDateEnd,
  setTransactionDateEnd,
  transactionPageSize,
  handleTransactionPageSize
}: IFilterProps) => {
  return (
    <div className="w-[100%] mb-4 flex flex-row space-between">
      <button
        className={`${forcedApiError ? 'bg-[red]' : 'bg-[blue]'} text-white py-2 px-4 rounded`}
        onClick={() => setForcedApiError(!forcedApiError)}
      >
        Force API Error
      </button>

      <select value={transactionSortKey} onChange={handleTransactionSort}>
        <option value="date-asc">Date newest</option>
        <option value="date-desc">Date oldest</option>
        <option value="amount-asc">Amount greater</option>
        <option value="amount-desc">Amount lower</option>
      </select>

      <select value={transactionPageSize} onChange={handleTransactionPageSize}>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>

      <Datepicker
        startDate={transactionDateStart}
        endDate={transactionDateEnd}
        onChangeStartDate={setTransactionDateStart}
        onChangeEndDate={setTransactionDateEnd}
        multiple
      />
    </div>
  )
}

export default Filter;
