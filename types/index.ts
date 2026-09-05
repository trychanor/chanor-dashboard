export type PaginationMetadata = {
  page: number;
  totalPages: number;
  totalRecords: number;
  limit?: number;
};

export type ApiResponse<T> = {
  data: T;
  status: boolean;
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

export type Transactions = {
  reference: string;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
};

export type Settlement = {
  provider: string;
  accountNumber: string;
  balanceEstimated: number;
  balanceActual: number;
  lastCheckedAt: string;
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
    value: 0;
    change: 0;
  };
  activeUsers: {
    value: 0;
    change: 0;
  };
};

export type TransactionVolume = {
  totalInflow: {
    value: 0;
    change: 0;
  };
  activeOutflow: {
    value: 0;
    change: 0;
  };
};

export type Profit = {
  companyProfit: {
    value: 0;
    change: 0;
  };
  netProfit: {
    value: 0;
    change: 0;
  };
};

export type Balance = {
  totalCommission: {
    value: 0;
    change: 0;
  };
  totalWalletBalance: {
    value: 0;
    change: 0;
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
