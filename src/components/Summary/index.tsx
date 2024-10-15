import { currencyFormatter } from "@/utils/formatter";

interface ISummaryProps {
  transactionCount: number;
  transactionAmount: number;
}

export const Summary = ({
  transactionCount,
  transactionAmount,
}: ISummaryProps) => {
  return (
    <div className="flex flex-row gap-4 text-[#333]">
      <div className="flex flex-col w-[100%] md:w-[25%] bg-[white] rounded p-2">
        <span className="text-[16px]">Total transactions</span>
        <span className="text-[28px] text-[#333]">
          <strong>{transactionCount}</strong>
        </span>
      </div>
      <div className="flex flex-col w-[100%] md:w-[25%] bg-[white] rounded p-2">
        <span className="text-[16px]">Total amount</span>
        <span className="text-[28px] text-[#333]">
          <strong>{currencyFormatter.format(transactionAmount)}</strong>
        </span>
      </div>
    </div>
  );
};

export default Summary;
