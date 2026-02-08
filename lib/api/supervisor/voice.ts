import {
  ApiResponseWithPaginationAndMetadata,
  UserVoice,
  ApiResponseWithMetadata,
  Voice,
} from "@/types";
import { safeApiCall, api } from "../clients";

type GetUserVoiceProps = {
  period: number;
};

type GetVoiceProps = {
  period: number;
};

export const getUserVoice = async ({ period }: GetUserVoiceProps) =>
  safeApiCall(
    api
      .get("analytics/voice/users", { searchParams: { period } })
      .json<
        ApiResponseWithPaginationAndMetadata<UserVoice[], { period: string }>
      >(),
  );

export const getVoice = async ({ period }: GetVoiceProps) =>
  safeApiCall(
    api
      .get("analytics/voice", { searchParams: { period } })
      .json<ApiResponseWithMetadata<Voice, { period: string }>>(),
  );
