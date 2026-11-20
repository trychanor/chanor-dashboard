export const MAX_PAGE_SIZE = 100;

export function readPositiveInteger(value: string | null, fallback: number) {
  if (value === null) return fallback;

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return null;
  }

  return parsedValue;
}
