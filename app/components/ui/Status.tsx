"use client";

// ONLY PROPS ALLOWED: label, appearance, showDot
// appearance: subtle, subtle-rounded, solid
// showDot: true or false

type BadgeAppearance = "subtle" | "subtle-rounded" | "solid";

interface BadgeProps {
  label?: string;
  appearance?: BadgeAppearance;
  showDot?: boolean;
}

const STATUS_COLOR_MAP = {
  green: ["completed", "successful", "active", "settled"],
  blue: ["transactions"],
  yellow: ["pending", "declined"],
  gray: ["inactive"],
  red: ["low", "high", "failed"],
};

const COLOR_TOKENS = {
  green: {
    light: "var(--green-light)",
    dark: "var(--green-primary)",
    dot: "var(--green-soft)",
    border: "var(--green-primary)",
  },
  blue: {
    light: "rgba(0,112,255,0.20)",
    dark: "var(--blue-primary)",
    dot: "var(--blue-primary)",
    border: "var(--blue-primary)",
  },
  yellow: {
    light: "var(--yellow-light)",
    dark: "var(--yellow-gold)",
    dot: "var(--yellow-secondary)",
    border: "var(--yellow-gold)",
  },
  gray: {
    light: "#A8A6A633",
    dark: "var(--neutral-750)",
    dot: "var(--neutral-750)",
    border: "var(--neutral-750)",
  },
  red: {
    light: "var(--red-light)",
    dark: "var(--red-primary)",
    dot: "var(--red-primary)",
    border: "var(--red-primary)",
  },
};

function resolveStatusColor(label: string) {
  const key = label.toLowerCase();

  if (STATUS_COLOR_MAP.green.includes(key)) return "green";
  if (STATUS_COLOR_MAP.blue.includes(key)) return "blue";
  if (STATUS_COLOR_MAP.yellow.includes(key)) return "yellow";
  if (STATUS_COLOR_MAP.gray.includes(key)) return "gray";
  if (STATUS_COLOR_MAP.red.includes(key)) return "red";

  return "gray";
}

export default function Status({
  label = "Active",
  appearance = "subtle", // subtle | subtle-rounded | solid
  showDot = true,
}: BadgeProps) {
  const colorKey = resolveStatusColor(label);
  const color = COLOR_TOKENS[colorKey];

  const base = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full";

  const appearances: Record<
    BadgeAppearance,
    {
      bg: string;
      text: string;
      border: string;
      font: string;
    }
  > = {
    subtle: {
      bg: color.light,
      text: color.dark,
      border: "none",
      font: "font-medium",
    },
    "subtle-rounded": {
      bg: color.light,
      text: color.dark,
      border: `1px solid ${color.border}`,
      font: "font-semibold",
    },
    solid: {
      bg: color.dark,
      text: "#ffffff",
      border: "none",
      font: "font-medium",
    },
  };

  const styles = appearances[appearance];

  return (
    <div
      className={base}
      style={{
        backgroundColor: styles.bg,
        border: styles.border,
      }}
    >
      {showDot && (
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color.dot }}
        />
      )}

      <p
        className={`text-sm leading-4 ${styles.font}`}
        style={{ color: styles.text }}
      >
        {label}
      </p>
    </div>
  );
}
