import {
  ApiResponseWithPaginationAndMetadata,
  UserVoice,
  ApiResponseWithMetadata,
  Voice,
} from "@/types";
import { safeApiCall, api } from "../http-client";

type GetVoiceProps = {
  period: number;
};

export const getUserVoice = async ({ period }: GetVoiceProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/voice/users", { searchParams: { period } })
      .json<
        ApiResponseWithPaginationAndMetadata<UserVoice[], { period: string }>
      >(),
  );

export const getVoice = async ({ period }: GetVoiceProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/voice", { searchParams: { period } })
      .json<ApiResponseWithMetadata<Voice, { period: string }>>(),
  );
