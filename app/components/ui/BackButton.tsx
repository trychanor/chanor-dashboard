"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center justify-center w-11 h-11 bg-neutral-200 rounded-full cursor-pointer"
      aria-label="Go back"
    >
      <FaChevronLeft className="text-neutral-350" />
    </button>
  );
}
