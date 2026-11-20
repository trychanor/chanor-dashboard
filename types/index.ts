export type PaginationMetadata = {
  page: number;
  totalPages: number;
  totalRecords: number;
  limit?: number;
};

export type ApiResponse<T> = {
  data: T;
  status: "success" | "fail" | "error";
};

export type ApiResult<T> =
  | { data: T; error: null }
  | { data: null; error: string };

export type ApiResponseWithMetadata<T, M> = ApiResponse<T> & {
  metadata: M;
};

export type ApiResponseWithPagination<T> = ApiResponse<T> & {
  metadata: PaginationMetadata;
};

export type ApiResponseWithPaginationAndMetadata<T, M> =
  ApiResponseWithMetadata<T, PaginationMetadata & M>;

export type AnalyticsPeriod = "day" | "week" | "month" | "year";

export type Transactions = {
  id: string;
  account: {
    id: string;
    accountNumber: string;
    bankName: string;
    customer: {
      id: string;
      name: string;
    };
  };
  reference: string;
  type: string;
  service: string;
  channel: string;
  amount: number;
  chanorFee: number;
  providerFee: number;
  vat: number;
  stampDutyAmount: number;
  status: string;
  providers: {
    wallet: string;
    bill: string;
    reference: string;
  };
  createdAt: string;
};

export type Settlement = {
  provider: string;
  accountNumber: string;
  balanceEstimated: number;
  balanceActual: number;
  lastCheckedAt: string;
};

export type SettlementReport = {
  totalFloat: number;
  pendingAmount: number;
  inflow: number;
  outflow: number;
};

export type Notification = {
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
};

export type TransactionHistoryItem = {
  _id: string;
  accountRef: string;
  type: string;
  service: string;
  channel: string;
  amount: { $numberDecimal: string };
  rabaFee: { $numberDecimal: string };
  providerFee: { $numberDecimal: string };
  status: string;
  reference: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TicketHistoryItem = {
  _id: string;
  customerRef: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  messages: {
    sender: string;
    body: string;
    createdAt: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type VoiceActivityItem = {
  _id: string;
  customerRef: string;
  source: string;
  command: string;
  success: boolean;
  durationMs: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type RecentActivityItem = {
  type: string;
  action: string;
  description: string;
  amount: number;
  status: string;
  date: string;
};

export type Customer = {
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  riskScore: string;
  device: string;
  dateRegistered: string;
  accountStatus: string;
  balance: number;
  balanceChange: number;
  lastDeposit: {
    amount: number;
    date: string;
  };
  lastActive: string;
  securityOverview: {
    failedLogins: number;
    lockedAccount: string;
    activeSession: boolean;
    fraudAlerts: number;
    fraudAlertsData: unknown[];
  };
  kyc: {
    tier: number;
  };
  transactionHistory: TransactionHistoryItem[];
  ticketHistory: TicketHistoryItem[];
  voiceActivity: VoiceActivityItem[];
  recentActivities: RecentActivityItem[];
  dob?: string;
};

export type User = {
  totalUsers: {
    value: number;
    change: number;
  };
  activeUsers: {
    value: number;
    change: number;
  };
};

export type TransactionVolume = {
  totalInflow: {
    value: number;
    change: number;
  };
  totalOutflow: {
    value: number;
    change: number;
  };
};

export type Profit = {
  companyProfit: {
    value: number;
    change: number;
  };
  netProfit: {
    value: number;
    change: number;
  };
};

export type Balance = {
  totalAgentCommissionClaimed: {
    value: number;
    change: number;
  };
  totalWalletBalance: {
    value: number;
    change: number;
  };
};

export type ProfitBreakdown = {
  totalProfit: 0;
  breakdown: {
    service: string;
    profit: 0;
    count: 0;
  }[];
};

export type Disputes = {
  totalDisputes: 0;
  byStatus: {
    status: string;
    count: 0;
  }[];
  byPriority: {
    priority: string;
    count: 0;
  }[];
};

export type InflowOutflow = {
  date: string;
  inflow: number;
  outflow: number;
};

export type ActivitySource = {
  source: string;
  count: number;
}[];

export type Voice = {
  totalRequest: number;
  avgDuration: number;
  byStatus: {
    status: string;
    count: 0;
  }[];
  bySource: {
    priority: string;
    count: 0;
  }[];
};

export type UserVoice = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  usageCount: number;
  lastUsed: string;
};
