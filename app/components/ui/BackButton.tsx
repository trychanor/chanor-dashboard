"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center justify-center w-11 h-11 bg-neutral-200 rounded-full cursor-pointer"
      aria-label="Go back"
    >
      <ChevronLeft className="text-neutral-350" />
    </button>
  );
}
