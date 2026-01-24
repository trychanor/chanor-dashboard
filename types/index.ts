export type PaginationMetadata = {
  page: number;
  totalPages: number;
  totalRecords: number;
};

export type ApiResponse<T> = {
  data: T
  status: boolean;
};

export type ApiResponseWithMetadata<T, M> = ApiResponse<T> & {
  metadata: M
};

export type ApiResponseWithPagination<T> = ApiResponse<T> & {
  metadata: PaginationMetadata
}

export type ApiResponseWithPaginationAndMetadata<T, M> = ApiResponseWithMetadata<
  T,
  PaginationMetadata & M
>;

export type Transactions = {
  reference: string,
  type: string,
  amount: number,
  status: string,
  createdAt: string
}

export type Settlement = {
  provider: string,
  accountNumber: string,
  balanceEstimated: number,
  balanceActual: number,
  lastCheckedAt: string
}

export type Notification = {
  title: string,
  message: string,
  type: string,
  read: boolean,
  createdAt: string
}

export type Customer = {
  userId: string,
  name: string,
  email: string,
  phone: boolean,
  dateRegistered: string
  accountStatus: string
  balance: number
}

export type User = {
  totalUsers: {
    value: 0,
    change: 0
  },
  activeUsers: {
    value: 0,
    change: 0
  },
}

export type TransactionVolume = {
  totalInflow: {
    value: 0,
    change: 0
  },
  activeOutflow: {
    value: 0,
    change: 0
  },
}

export type Profit = {
  companyProfit: {
    value: 0,
    change: 0
  },
  netProfit: {
    value: 0,
    change: 0
  },
}

export type Balance = {
  totalCommission: {
    value: 0,
    change: 0
  },
  totalWalletBalance: {
    value: 0,
    change: 0
  },
}

export type ProfitBreakdown = {
  totalProfit: 0,
  breakdown: {
    service: string,
    profit: 0,
    count: 0
  }[]
}

export type Disputes = {
  totalDisputes: 0,
  byStatus: {
    status: string,
    count: 0
  }[],
  byPriority: {
    priority: string,
    count: 0
  }[]
}

export type InflowOutflow = {
  date: string,
  inflow: number,
  outflow: number
}

export type ActivitySource = {
  source: string,
  count: number
}[]

export type Voice = {
  totalRequest: number,
  avgDuration: number,
  byStatus: {
    status: string,
    count: 0
  }[],
  bySource: {
    priority: string,
    count: 0
  }[]
}

export type UserVoice = {
  userId: string,
  name: string,
  email: string,
  phone: string,
  usageCount: number,
  lastUsed: string
}