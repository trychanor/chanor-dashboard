"use client";

import { Search } from "lucide-react";
import {
  ChangeEvent,
  InputHTMLAttributes,
  FocusEvent,
  useEffect,
  useState,
} from "react";

interface SearchBarProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onDebouncedChange,
  debounceMs = 500,
  placeholder = "Search...",
  className = "",
  onFocus,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");

  const text = value !== undefined ? value : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (value !== undefined) {
      onChange?.(newValue); // controlled
    } else {
      setInternalValue(newValue); // uncontrolled
      onChange?.(newValue);
    }
  };

  const handleSearch = () => {
    onSearch?.(text);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
    setFocusVersion((currentVersion) => currentVersion + 1);
  };

  const [focusVersion, setFocusVersion] = useState(0);

  useEffect(() => {
    if (!onDebouncedChange) return;

    const timer = window.setTimeout(() => {
      onDebouncedChange(text);
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [debounceMs, focusVersion, onDebouncedChange, text]);

  return (
    <div
      className={`flex items-center gap-2 border border-neutral-300 rounded-lg px-3 py-2 bg-white ${className}`}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    >
      <Search className="w-5 h-5 text-neutral-500" />

      <input
        type="text"
        onFocus={handleFocus}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 text-sm outline-none bg-transparent"
        {...props}
      />
    </div>
  );
}
