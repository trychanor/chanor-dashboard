type UnknownRecord = Record<string, unknown>;

export type TransactionSummary = {
  id: string;
  reference: string | null;
  customerName: string | null;
  accountNumber: string | null;
  amount: number | null;
  createdAt: string | null;
  status: string | null;
  service: string | null;
};

export type TransactionListResponse = {
  data: TransactionSummary[];
  metadata: {
    page: number;
    totalPages: number;
    totalRecords: number;
    limit: number | null;
  };
};

function asRecord(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function asFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string" && value.trim() !== "") {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  const decimal = asRecord(value);
  return asFiniteNumber(decimal?.$numberDecimal);
}

function readPositiveNumber(value: unknown, fallback: number): number {
  const parsedValue = asFiniteNumber(value);
  return parsedValue !== null &&
    Number.isInteger(parsedValue) &&
    parsedValue > 0
    ? parsedValue
    : fallback;
}

function getCustomerName(transaction: UnknownRecord): string | null {
  const account = asRecord(transaction.account);
  const customer = asRecord(account?.customer);
  const customerName = asString(customer?.name);

  if (customerName) return customerName;

  const legacyAccount = asRecord(transaction.accountRef);
  const legacyCustomer = asRecord(legacyAccount?.customerRef);
  const firstName = asString(legacyCustomer?.firstName);
  const lastName = asString(legacyCustomer?.lastName);
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  if (fullName) return fullName;

  const meta = asRecord(transaction.meta);
  const providerTransaction = asRecord(meta?.rawProviderTransaction);
  const metadata = asRecord(providerTransaction?.metadata);

  return asString(metadata?.customerName);
}

export function mapTransactionsResponse(
  response: unknown,
): TransactionListResponse {
  const responseRecord = asRecord(response);
  const data = Array.isArray(responseRecord?.data) ? responseRecord.data : [];
  const metadata = asRecord(responseRecord?.metadata);

  return {
    data: data.map((value, index) => {
      const transaction = asRecord(value) ?? {};
      const reference = asString(transaction.reference);

      return {
        id:
          asString(transaction._id) ??
          asString(transaction.id) ??
          reference ??
          `transaction-${index}`,
        reference,
        customerName: getCustomerName(transaction),
        accountNumber:
          asString(asRecord(transaction.account)?.accountNumber) ??
          asString(transaction.toAccount),
        amount: asFiniteNumber(transaction.amount),
        createdAt: asString(transaction.createdAt),
        status: asString(transaction.status),
        service: asString(transaction.service),
      };
    }),
    metadata: {
      page: readPositiveNumber(metadata?.page, 1),
      totalPages: readPositiveNumber(metadata?.totalPages, 1),
      totalRecords: readPositiveNumber(metadata?.totalRecords, data.length),
      limit: asFiniteNumber(metadata?.limit),
    },
  };
}
