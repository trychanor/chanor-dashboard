import { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";

interface TableColumn {
  key: string;
  label: string | ReactNode;
  render?: (rowData: any) => ReactNode;
  className?: string;
}

interface TableRow {
  id: string | number;
  data: Record<string, any>;
  actions?: ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  showRowActions?: boolean;
}

export default function Table({
  columns,
  rows,
  className = "",
  tableClassName = "min-w-full border-collapse",
  headerClassName = "bg-white-pure",
  rowClassName = "text-neutral-600 text-xs border-b border-b-neutral-250 hover:bg-white-pure",
  cellClassName = "px-4 py-2 text-sm font-semibold -tracking-[0.25px] text-neutral-600 text-left",
  showRowActions = true,
}: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={tableClassName}>
        <thead className={headerClassName}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
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
                  key={col.key}
                  className={`${cellClassName} ${col.className || ""}`}
                >
                  {col.render ? col.render(row.data) : row.data[col.key]}
                </td>
              ))}
              {showRowActions && (
                <td className={cellClassName}>
                  {row.actions || (
                    <button className="p-1 hover:bg-neutral-100 rounded-full">
                      <MoreHorizontal size={16} />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
