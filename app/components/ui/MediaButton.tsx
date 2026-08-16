"use client";

import { Play, Pause } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type MediaButtonMode = "play" | "pause";

interface MediaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: MediaButtonMode;
  size?: number;
  color?: string;
}

export default function MediaButton({
  mode = "play",
  size = 40,
  color = "var(--green-primary)",
  className = "",
  ...props
}: MediaButtonProps) {
  const bgColor = mode === "play" ? "var(--neutral-400)" : color;
  const borderColor =
    mode === "play" ? "var(--dark-gray)" : "var(--green-dark)";

  return (
    <button
      className={`flex justify-center items-center rounded-full border-4 text-white transition-all duration-300 ease-in-out ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
      {...props}
    >
      {mode === "play" ? (
        <Play className="w-[50%] h-[50%]" />
      ) : (
        <Pause className="w-[50%] h-[50%]" />
      )}
    </button>
  );
}
