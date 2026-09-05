"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown from "./Dropdown";

type PaginationProps = {
  page: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  isLoading?: boolean;
};

function getPageItems(page: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: Array<number | "ellipsis"> = [1];
  const startPage = Math.max(2, page - 1);
  const endPage = Math.min(totalPages - 1, page + 1);

  if (startPage > 2) items.push("ellipsis");

  for (let currentPage = startPage; currentPage <= endPage; currentPage += 1) {
    items.push(currentPage);
  }

  if (endPage < totalPages - 1) items.push("ellipsis");

  items.push(totalPages);

  return items;
}

export default function Pagination({
  page,
  totalPages,
  totalRecords,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
}: PaginationProps) {
  const firstRecord = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastRecord = Math.min(page * pageSize, totalRecords);
  const pageItems = getPageItems(page, totalPages);

  return (
    <div className="flex flex-col gap-3 border-t border-neutral-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 text-xs text-neutral-600">
        <span>
          Showing {firstRecord}-{lastRecord} of {totalRecords}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">Rows</span>
          <Dropdown
            value={String(pageSize)}
            options={pageSizeOptions.map((option) => ({
              label: String(option),
              value: String(option),
            }))}
            onChange={(value) => onPageSizeChange(Number(value))}
            size="sm"
            width="72px"
            className="shrink-0"
          />
        </div>
      </div>

      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          title="Previous page"
          disabled={isLoading || page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="grid size-8 place-items-center rounded-md border border-neutral-300 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="grid size-8 place-items-center text-sm text-neutral-500"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              disabled={isLoading}
              onClick={() => onPageChange(item)}
              className={`grid size-8 place-items-center rounded-md border text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
                item === page
                  ? "border-raba-orange bg-raba-orange font-semibold text-white"
                  : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Next page"
          title="Next page"
          disabled={isLoading || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="grid size-8 place-items-center rounded-md border border-neutral-300 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}
