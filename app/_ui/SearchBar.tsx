import { Search } from "lucide-react";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  className = "",
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

  return (
    <div
      className={`flex items-center gap-2 border border-neutral-300 rounded-lg px-3 py-2 bg-white ${className}`}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    >
      <Search className="w-5 h-5 text-neutral-500" />

      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 text-sm outline-none bg-transparent"
        {...props}
      />
    </div>
  );
}
