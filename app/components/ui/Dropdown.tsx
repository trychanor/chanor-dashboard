"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  value?: string;
  defaultValue?: string;
  options?: DropdownOption[];
  placeholder?: string;
  trigger?: ReactNode;
  renderOption?: (option: DropdownOption, selected: boolean) => ReactNode;
  onChange?: (value: string) => void;
  direction?: "bottom" | "top";
  variant?: "outline" | "solid";
  size?: "sm" | "md" | "lg";
  width?: string;
  className?: string;
}

export default function Dropdown({
  value,
  defaultValue,
  options = [],
  placeholder = "Select",
  trigger,
  renderOption,
  onChange,
  direction = "bottom",
  variant = "outline",
  size = "md",
  width = "200px",
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const selectedValue = isControlled ? value : internalValue;

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
    setOpen(false);
  };

  // close dropdown if clicked outside
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const sizeMap = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantMap = {
    outline: "border border-neutral-300 bg-white",
    solid: "bg-neutral-300 border border-neutral-300",
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ width }}
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex justify-between items-center rounded-lg ${sizeMap[size]} ${variantMap[variant]} transition`}
      >
        {trigger ? (
          trigger
        ) : (
          <>
            <span
              className={!selectedValue ? "text-dark-gray" : "text-dark-gray"}
            >
              {selectedValue
                ? options.find((o) => o.value === selectedValue)?.label
                : placeholder}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition text-dark-gray ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {/* Dropdown Items */}
      {open && (
        <ul
          className={`
            grid divide-y divide-neutral-350 absolute left-0 w-full mt-2 bg-white shadow-lg border-bottom border-bottom-neutral-500 z-40
            ${direction === "top" ? "bottom-full mb-2" : "top-full"}
          `}
        >
          {options.map((opt) => {
            const selected = opt.value === selectedValue;

            return (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`
                  text-neutral-400 px-3 py-2 cursor-pointer transition 
                  ${selected ? "bg-neutral-100" : "hover:bg-neutral-100"}
                `}
              >
                {renderOption ? renderOption(opt, selected) : opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
