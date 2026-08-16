"use client";

import { ReactNode, useState, useRef } from "react";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface TableColumn<TData> {
  key: keyof TData;
  label: string | ReactNode;
  render?: (rowData: TData) => ReactNode;
  className?: string;
}

interface MenuItem<TData> {
  icon?: ReactNode;
  label: string;
  onClick?: (rowData: TData) => void;
}

interface TableRow<TData> {
  id: string | number;
  data: TData;
}

interface TableProps<TData> {
  columns: TableColumn<TData>[];
  rows: TableRow<TData>[];
  menus?: MenuItem<TData>[];
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  showRowActions?: boolean;
}

export default function Table<TData extends Record<string, unknown>>({
  columns,
  rows,
  menus,
  className = "",
  tableClassName = "min-w-full border-collapse",
  headerClassName = "bg-white-pure",
  rowClassName = "text-neutral-600 text-xs border-b border-b-neutral-250 hover:bg-white-pure",
  cellClassName = "p-4 text-sm -tracking-[0.25px] text-neutral-600 text-left",
  showRowActions = true,
}: TableProps<TData>) {
  const [openRowId, setOpenRowId] = useState<number | string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setOpenRowId(null);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={tableClassName}>
        <thead className={headerClassName}>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`${cellClassName} ${col.className || ""}`}
              >
                {col.label}
              </th>
            ))}
            {showRowActions && <th className={cellClassName}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={rowClassName}>
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`${cellClassName} ${col.className || ""}`}
                >
                  {col.render ? col.render(row.data) : (row.data[col.key] as ReactNode)}
                </td>
              ))}
              {showRowActions && (
                <td className={cellClassName}>
                  <div className="relative" ref={menuRef}>
                    <button
                      className="p-1 hover:bg-neutral-100 rounded-full cursor-pointer"
                      onClick={() =>
                        setOpenRowId(openRowId === row.id ? null : row.id)
                      }
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {menus && openRowId === row.id && (
                      <div className="absolute right-20 mt-2 w-40 bg-white rounded shadow-lg z-10">
                        {menus.map((menu) => (
                          <button
                            key={menu.label}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 cursor-pointer"
                            onClick={() => {
                              if (menu.onClick) menu.onClick(row.data);
                              setOpenRowId(null);
                            }}
                          >
                            {menu?.icon}
                            {menu.label.toLowerCase() === "see details" &&
                              !menu.icon && <Eye className="w-4 h-4" />}
                            {menu.label.toLowerCase() === "edit" &&
                              !menu.icon && <Pencil className="w-4 h-4" />}
                            {menu.label.toLowerCase() === "delete" &&
                              !menu.icon && <Trash2 className="w-4 h-4" />}

                            {menu.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
