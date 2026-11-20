import { ApiResponse, ApiResponseWithPagination, PaginationMetadata } from "@/types";

type UnknownRecord = Record<string, unknown>;

type SecurityCustomer = {
  id: string | null;
  name: string | null;
  email: string | null;
};

export type SecurityOverview = {
  failedLoginCount: number | null;
  activeSessions: number | null;
  lockedAccounts: number | null;
  openFraudAlerts: number | null;
};

export type FailedLoginEvent = {
  id: string;
  customer: SecurityCustomer | null;
  reason: string | null;
  deviceId: string | null;
  ipAddress: string | null;
  attemptedAt: string | null;
};

export type LockedAccountEvent = {
  id: string;
  customer: SecurityCustomer | null;
  accountNumber: string | null;
  restrictionType: string | null;
  reason: string | null;
  source: string | null;
  deviceId: string | null;
  ipAddress: string | null;
  restrictedAt: string | null;
};

export type FraudAlert = {
  id: string;
  customer: SecurityCustomer | null;
  type: string | null;
  title: string | null;
  description: string | null;
  severity: string | null;
  status: string | null;
  createdAt: string | null;
};

export type WalletAlert = {
  id: string;
  type: string | null;
  title: string | null;
  message: string | null;
  amount: number | null;
  action: string | null;
  read: boolean | null;
  createdAt: string | null;
};

function asRecord(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function asFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string" && value.trim()) {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  return null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function mapCustomer(value: unknown): SecurityCustomer | null {
  const customer = asRecord(value);

  if (!customer) return null;

  return {
    id: asText(customer.id),
    name: asText(customer.name),
    email: asText(customer.email),
  };
}

function mapMetadata(value: unknown, dataLength: number): PaginationMetadata {
  const metadata = asRecord(value);

  return {
    page: asFiniteNumber(metadata?.page) ?? 1,
    limit: asFiniteNumber(metadata?.limit) ?? dataLength,
    totalPages: asFiniteNumber(metadata?.totalPages) ?? 1,
    totalRecords: asFiniteNumber(metadata?.totalRecords) ?? dataLength,
  };
}

function mapPaginatedResponse<T>(
  response: ApiResponseWithPagination<unknown[]> | null,
  mapItem: (value: unknown) => T | null,
): ApiResponseWithPagination<T[]> {
  if (!response || !Array.isArray(response.data)) {
    throw new Error("Security data is unavailable.");
  }

  return {
    status: response.status,
    metadata: mapMetadata(response.metadata, response.data.length),
    data: response.data
      .map(mapItem)
      .filter((item): item is T => item !== null),
  };
}

export function mapSecurityOverview(
  response: ApiResponse<unknown> | null,
): SecurityOverview {
  const data = asRecord(response?.data);

  if (!data) throw new Error("Security overview is unavailable.");

  return {
    failedLoginCount: asFiniteNumber(data.failedLoginCount),
    activeSessions: asFiniteNumber(data.activeSessions),
    lockedAccounts: asFiniteNumber(data.lockedAccounts),
    openFraudAlerts: asFiniteNumber(data.openFraudAlerts),
  };
}

export function mapFailedLogins(
  response: ApiResponseWithPagination<unknown[]> | null,
) {
  return mapPaginatedResponse(response, (value): FailedLoginEvent | null => {
    const event = asRecord(value);
    const id = asText(event?.id);

    if (!event || !id) return null;

    return {
      id,
      customer: mapCustomer(event.customer),
      reason: asText(event.reason),
      deviceId: asText(event.deviceId),
      ipAddress: asText(event.ipAddress),
      attemptedAt: asText(event.attemptedAt),
    };
  });
}

export function mapLockedAccounts(
  response: ApiResponseWithPagination<unknown[]> | null,
) {
  return mapPaginatedResponse(response, (value): LockedAccountEvent | null => {
    const event = asRecord(value);
    const id = asText(event?.id);

    if (!event || !id) return null;

    return {
      id,
      customer: mapCustomer(event.customer),
      accountNumber: asText(event.accountNumber),
      restrictionType: asText(event.restrictionType),
      reason: asText(event.reason),
      source: asText(event.source),
      deviceId: asText(event.deviceId),
      ipAddress: asText(event.ipAddress),
      restrictedAt: asText(event.restrictedAt),
    };
  });
}

export function mapFraudAlerts(
  response: ApiResponseWithPagination<unknown[]> | null,
) {
  return mapPaginatedResponse(response, (value): FraudAlert | null => {
    const alert = asRecord(value);
    const id = asText(alert?.id);

    if (!alert || !id) return null;

    return {
      id,
      customer: mapCustomer(alert.customer),
      type: asText(alert.type),
      title: asText(alert.title),
      description: asText(alert.description),
      severity: asText(alert.severity),
      status: asText(alert.status),
      createdAt: asText(alert.createdAt),
    };
  });
}

export function mapWalletAlerts(
  response: ApiResponseWithPagination<unknown[]> | null,
) {
  return mapPaginatedResponse(response, (value): WalletAlert | null => {
    const alert = asRecord(value);
    const id = asText(alert?.id);

    if (!alert || !id) return null;

    return {
      id,
      type: asText(alert.type),
      title: asText(alert.title),
      message: asText(alert.message),
      amount: asFiniteNumber(alert.amount),
      action: asText(alert.action),
      read: asBoolean(alert.read),
      createdAt: asText(alert.createdAt),
    };
  });
}
