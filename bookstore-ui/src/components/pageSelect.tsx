interface PageSelectProps {
  totalPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}
export const PageSelect: React.FC<PageSelectProps> = ({
  totalPages,
  currentPage,
  onPageClick,
}) => {
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex row mt-4 gap-x-2 lg:gap-x-8">
      {new Array(endPage - startPage + 1).fill("").map((_, index) => {
        const pageNumber = startPage + index;
        return (
          <button
            key={`page-button-${pageNumber}`}
            onClick={() => onPageClick(pageNumber)}
            className={`${
              pageNumber === currentPage
                ? "bg-slate-500 text-white rounded"
                : ""
            } p-2`}
          >
            {pageNumber}
          </button>
        );
      })}
      <div className="font-bold pt-2">
        {endPage - startPage + 1 < totalPages
          ? `.   .   .   ${totalPages}`
          : null}
      </div>
    </div>
  );
};
