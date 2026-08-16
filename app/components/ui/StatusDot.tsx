"use client";

interface StatusDotProps {
  label: string;
  size?: number;
}

const STATUS_COLORS: Record<string, string> = {
  success: "var(--green-soft)",
  successful: "var(--green-soft)",
  completed: "var(--green-soft)",
  failed: "var(--red-primary)",
  pending: "var(--yellow-gold)",
  declined: "var(--yellow-gold)",
};

export default function StatusDot({ label, size = 10 }: StatusDotProps) {
  const normalizedLabel = label.toLowerCase();
  const bgColor = STATUS_COLORS[normalizedLabel] || "#9CA3AF";

  return (
    <div
      className="rounded-full shrink-0"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
      }}
      title={label}
    />
  );
}
