"use client";

import { TextareaHTMLAttributes } from "react";

type TextareaVariant = "default" | "outline" | "error" | "success";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  additionalStyles?: string;
}

export default function Textarea({
  variant = "default",
  additionalStyles = "",
  className,
  ...props
}: TextareaProps) {
  const variants: Record<TextareaVariant, string> = {
    default:
      "bg-white text-[#AEAEB2] border border-black focus:border-black focus:ring-1 focus:ring-black",
    outline:
      "bg-white text-[#AEAEB2] border border-gray-300 focus:border-blue-secondary focus:ring-1 focus:ring-blue-secondary",
    error:
      "bg-white text-[#AEAEB2] border border-red-secondary focus:border-red-secondary focus:ring-1 focus:ring-red-secondary",
    success:
      "bg-white text-[#AEAEB2] border border-green-accent focus:border-green-accent focus:ring-1 focus:ring-green-accent",
  };

  return (
    <textarea
      className={`w-full text-xs leading-4.5 font-medium rounded-lg px-3 py-2 resize-none outline-none smooth-transition
      ${variants[variant]} ${additionalStyles} ${className || ""}`}
      {...props}
    />
  );
}
