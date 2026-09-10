type TableSkeletonProps = {
  columnCount: number;
  rowCount?: number;
  className?: string;
};

export default function TableSkeleton({
  columnCount,
  rowCount = 5,
  className = "",
}: TableSkeletonProps) {
  return (
    <div
      className={`overflow-x-auto ${className}`}
      aria-busy="true"
      aria-label="Loading table data"
    >
      <span className="sr-only">Loading table data</span>
      <table className="min-w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-neutral-200">
            {Array.from({ length: columnCount }, (_, index) => (
              <th key={index} className="p-3 text-left">
                <div className="h-3 w-20 animate-pulse rounded bg-neutral-200" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }, (_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-neutral-200">
              {Array.from({ length: columnCount }, (_, columnIndex) => (
                <td key={columnIndex} className="p-3">
                  <div
                    className={`h-3 animate-pulse rounded bg-neutral-100 ${
                      columnIndex === 0 ? "w-24" : "w-full max-w-36"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
