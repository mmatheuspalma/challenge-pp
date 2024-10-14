interface IPaginationProps {
  transactionPage: number;
  transactionTotalPages: number;
  goToTransactionPage: Function;
  canGoToTransactionPage: (page: number) => boolean;
  goToPreviousTransactionPage: Function;
  canGoToPreviousTransactionPage: boolean;
  goToNextTransactionPage: Function;
  canGoToNextTransactionPage: boolean;
}

interface IPaginationItemProps {
  page: number | string;
  action: Function;
  enabled?: boolean;
  prevOrNext?: boolean;
  current?: number;
}

const PaginationItem = ({ page, prevOrNext = false, action, enabled, current }: IPaginationItemProps) => {
  return enabled ? (
    <span
      className={`px-3 py-1 cursor-pointer text-[16px] text-[#333] rounded ${current === page ? 'bg-[blue] text-white' : 'bg-[white]'}`}
      onClick={() => prevOrNext ? action() : action(page)}
    >
      {page}
    </span>
  ) : null;
};

export const Pagination = ({
  transactionPage,
  transactionTotalPages,
  goToTransactionPage,
  canGoToTransactionPage,
  goToPreviousTransactionPage,
  canGoToPreviousTransactionPage,
  goToNextTransactionPage,
  canGoToNextTransactionPage,
}: IPaginationProps) => {
  const pages = transactionTotalPages ? new Array(transactionTotalPages).fill('') : [];

  console.log('total pages', transactionTotalPages, pages)

  return pages.length > 1 ? (
    <div className="flex flex-row justify-start gap-4">
      <PaginationItem
        page="previous"
        action={goToPreviousTransactionPage}
        enabled={canGoToPreviousTransactionPage}
        prevOrNext
      />
      {
       pages.map((_, index) => {
          const page = index + 1;

          return (
            <PaginationItem
              key={page}
              page={page}
              action={goToTransactionPage}
              current={transactionPage}
              enabled={canGoToTransactionPage(page)}
            />
          )
        })
      }
      <PaginationItem
        page="next"
        action={goToNextTransactionPage}
        enabled={canGoToNextTransactionPage}
        prevOrNext
      />
    </div>
  ) : null
};

export default Pagination;
