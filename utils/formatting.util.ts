const unavailableText = "Not available";

type DateFormatOptions = {
  includeTime?: boolean;
  locale?: string;
  dateOptions?: Intl.DateTimeFormatOptions;
};

type CurrencyFormatOptions = {
  locale?: string;
  symbol?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatDate(
  value: string | null | undefined,
  {
    includeTime = false,
    locale,
    dateOptions,
  }: DateFormatOptions = {},
) {
  if (!value) return unavailableText;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return unavailableText;

  if (includeTime) return date.toLocaleString(locale);

  return date.toLocaleDateString(locale, dateOptions);
}

export function formatTime(value: string | null | undefined, locale = "en-US") {
  if (!value) return unavailableText;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return unavailableText;

  return date.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export function formatCurrency(
  value: number | null | undefined,
  {
    locale = "en-NG",
    symbol = "₦",
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  }: CurrencyFormatOptions = {},
) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return unavailableText;
  }

  return `${symbol}${value.toLocaleString(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  })}`;
}

export function formatStatus(value: string | null | undefined) {
  if (!value) return unavailableText;

  return value.charAt(0).toUpperCase() + value.slice(1);
}
