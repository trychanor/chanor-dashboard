import "server-only"; // Safety: Prevents this file from being used in client components
import ky from "ky";
import { HTTPError } from "ky";
import { auth } from "@clerk/nextjs/server";
import { ApiResult } from "@/types";

const isLocal = process.env.API_ENV === "local";
const BASE_API_URL = isLocal
  ? process.env.BASE_API_URL_LOCAL
  : process.env.BASE_API_URL_REMOTE;

/**
 * Centralized Ky instance for Server-Side API calls.
 * This ensures all requests to our backend are authenticated
 * and include the required security headers.
 */
export const api = ky.create({
  prefixUrl: BASE_API_URL,
  timeout: 10000, // 10s
  hooks: {
    beforeRequest: [
      async (request) => {
        const { getToken } = await auth();
        const token = await getToken();

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }

        if (process.env.SUPERVISOR_API_KEY) {
          request.headers.set("x-apikey", process.env.SUPERVISOR_API_KEY);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok) {
          // Centralized error logging (will be expanded to sentry later)
          console.error(`API Error: ${response.status} - ${request.url}`);
        }
      },
    ],
  },
});

export async function safeApiCall<T>(
  request: Promise<T> | (() => Promise<T>),
): Promise<ApiResult<T>> {
  try {
    const data = await (typeof request === "function" ? request() : request);
    return { data, error: null };
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorData = await error.response.json().catch(() => ({}));

      const message =
        errorData.message ||
        errorData.error ||
        `Request failed (${error.response.status})`;

      console.error(`[API Error] ${error.response.status}:`, errorData);

      return {
        data: null,
        error: message,
      };
    }
    if (error instanceof TypeError && error.message.includes("parse URL")) {
      return {
        data: null,
        error: "Supervisor API base URL is not configured correctly",
      };
    }
    return { data: null, error: "An unexpected connection error occurred" };
  }
}
