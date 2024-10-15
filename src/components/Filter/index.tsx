import { ChangeEvent } from "react";

import Datepicker from "../DatePicker";

interface IFilterProps {
  forcedApiError: boolean;
  transactionSortKey: string;
  handleTransactionSort: (event: ChangeEvent<HTMLSelectElement>) => void;
  setForcedApiError: Function;
  transactionDateStart: Date;
  handleTransactionDateStart: Function;
  transactionDateEnd?: Date;
  handleTransactionDateEnd?: Function;
  transactionPageSize: number;
  handleTransactionPageSize: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Filter = ({
  forcedApiError,
  transactionSortKey,
  handleTransactionSort,
  setForcedApiError,
  transactionDateStart,
  handleTransactionDateStart,
  transactionDateEnd,
  handleTransactionDateEnd,
  transactionPageSize,
  handleTransactionPageSize
}: IFilterProps) => {
  return (
    <div className="w-[100%] flex flex-col lg:flex-row space-between gap-4">
      <div className="flex flex-col">
        <label htmlFor="force-error">Force error</label>
        <button
          id="force-error"
          className={`${forcedApiError ? 'bg-[red]' : 'bg-[blue]'} h-[40px] text-white py-2 px-4 rounded`}
          onClick={() => setForcedApiError(!forcedApiError)}
        >
          Force API Error
        </button>
      </div>

      <div className="flex flex-col">
        <label htmlFor="sorting">Sorting</label>
        <select
          id="sorting"
          name="sorting"
          className="w-[150px] h-[40px] text-[#333]"
          value={transactionSortKey}
          onChange={handleTransactionSort}
        >
          <option>Select sorting</option>
          <option value="date-asc">Date newest</option>
          <option value="date-desc">Date oldest</option>
          <option value="amount-asc">Amount greater</option>
          <option value="amount-desc">Amount lower</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="page-size">Page size</label>
        <select
          id="page-size"
          name="page-size"
          className="w-[100px] h-[40px] text-[#333]"
          value={transactionPageSize}
          onChange={handleTransactionPageSize}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </div>

      <Datepicker
        startDate={transactionDateStart}
        endDate={transactionDateEnd}
        onChangeStartDate={handleTransactionDateStart}
        onChangeEndDate={handleTransactionDateEnd}
        multiple
      />
    </div>
  )
}

export default Filter;
