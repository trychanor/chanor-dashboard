"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [actionMenu, setActionMenu] = useState<{
    top: number;
    left: number;
    opensUpward: boolean;
    trigger: HTMLButtonElement;
  } | null>(null);

  useEffect(() => {
    if (!actionMenu) return;

    const trigger = actionMenu.trigger;

    function closeMenu(event: MouseEvent) {
      const target = event.target as Node;

      if (
        !menuRef.current?.contains(target) &&
        !trigger.contains(target)
      ) {
        setOpenRowId(null);
        setActionMenu(null);
      }
    }

    function closeMenuForViewportChange() {
      setOpenRowId(null);
      setActionMenu(null);
    }

    document.addEventListener("mousedown", closeMenu);
    window.addEventListener("resize", closeMenuForViewportChange);
    window.addEventListener("scroll", closeMenuForViewportChange, true);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      window.removeEventListener("resize", closeMenuForViewportChange);
      window.removeEventListener("scroll", closeMenuForViewportChange, true);
    };
  }, [actionMenu]);

  function toggleActionMenu(
    rowId: string | number,
    trigger: HTMLButtonElement,
  ) {
    if (openRowId === rowId) {
      setOpenRowId(null);
      setActionMenu(null);
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const estimatedMenuHeight = (menus?.length ?? 1) * 40 + 16;
    const opensUpward =
      triggerRect.bottom + estimatedMenuHeight > window.innerHeight;

    setOpenRowId(rowId);
    setActionMenu({
      top: opensUpward ? triggerRect.top - 8 : triggerRect.bottom + 8,
      left: triggerRect.right,
      opensUpward,
      trigger,
    });
  }

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
                  <div className="flex justify-end">
                    <button
                      type="button"
                      aria-label={`Actions for row ${row.id}`}
                      aria-expanded={openRowId === row.id}
                      aria-haspopup="menu"
                      title="Actions"
                      className="rounded-full p-1 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
                      onClick={(event) =>
                        toggleActionMenu(row.id, event.currentTarget)
                      }
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {actionMenu &&
        menus &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-50 w-40 rounded-md border border-neutral-200 bg-white py-1 shadow-lg"
            style={{
              top: actionMenu.top,
              left: actionMenu.left,
              transform: actionMenu.opensUpward
                ? "translate(-100%, -100%)"
                : "translateX(-100%)",
            }}
          >
            {menus.map((menu) => (
              <button
                key={menu.label}
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-neutral-700 transition hover:bg-neutral-100"
                onClick={() => {
                  const row = rows.find((item) => item.id === openRowId);

                  if (row) menu.onClick?.(row.data);

                  setOpenRowId(null);
                  setActionMenu(null);
                }}
              >
                {menu.icon}
                {menu.label.toLowerCase() === "see details" && !menu.icon && (
                  <Eye className="size-4" />
                )}
                {menu.label.toLowerCase() === "edit" && !menu.icon && (
                  <Pencil className="size-4" />
                )}
                {menu.label.toLowerCase() === "delete" && !menu.icon && (
                  <Trash2 className="size-4" />
                )}
                {menu.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
