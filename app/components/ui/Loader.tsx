"use client";

interface LoaderProps {
  text?: string;
  className?: string;
}

export default function Loader({
  text = "Loading...",
  className = "",
}: LoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
      {text && (
        <p className="mt-4 text-sm text-neutral-500">{text}</p>
      )}
    </div>
  );
}