"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa6";
import { format } from "date-fns";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  showTime?: boolean;
  placeholder?: string;
  className?: string;
}

export default function DateTimePicker({
  value,
  onChange,
  minDate,
  maxDate,
  showTime = true,
  placeholder = "Select date & time",
  className = "",
}: DateTimePickerProps) {
  const [selected, setSelected] = useState<Date | null>(value ?? null);
  const [open, setOpen] = useState(false);

  const handleChange = (date: Date | null) => {
    setSelected(date);
    if (date) onChange?.(date);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Input UI */}
      <button
        onClick={() => setOpen(true)}
        className="
          flex items-center justify-between w-full
          px-3 py-2 rounded-lg border border-gray-300
          bg-white smooth-transition
          hover:bg-gray-50
        "
      >
        <div className="flex items-center gap-2 text-left">
          <FaCalendar className="w-5 h-5 text-gray-600" />

          <span className="text-[14px] text-gray-800">
            {selected ? format(selected, "MMM d, yyyy – hh:mm a") : placeholder}
          </span>
        </div>
      </button>

      {/* Hidden Datepicker popper */}
      <DatePicker
        selected={selected}
        onChange={handleChange}
        onClickOutside={() => setOpen(false)}
        open={open}
        showTimeSelect={showTime}
        popperPlacement="bottom-start"
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="MMM d, yyyy – hh:mm a"
        className="hidden"
      />
    </div>
  );
}
