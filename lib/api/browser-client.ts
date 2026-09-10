import { ApiResult } from "@/types";

type QueryValue = string | number | boolean | undefined;

export async function getJson<T>(
  path: string,
  query: Record<string, QueryValue>,
): Promise<ApiResult<T>> {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const response = await fetch(`${path}?${searchParams.toString()}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  let result: ApiResult<T>;

  try {
    result = (await response.json()) as ApiResult<T>;
  } catch {
    return { data: null, error: "The server returned an invalid response." };
  }

  if (!response.ok && !result.error) {
    return { data: null, error: "Request could not be completed." };
  }

  return result;
}
