export type DashboardStatKey = 'revenue' | 'activeProjects' | 'clients' | 'completionRate';

export interface DashboardStat {
  key: DashboardStatKey;
  value: string;
}

export interface RevenuePoint {
  year: number;
  month: number;
  value: number;
}
