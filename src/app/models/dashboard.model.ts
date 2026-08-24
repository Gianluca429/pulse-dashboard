export type ProjectStatus = 'in-progress' | 'review' | 'completed';

export type DeadlineType = 'meeting' | 'delivery' | 'review';

export interface DashboardStat {
  key: 'revenue' | 'activeProjects' | 'clients' | 'completionRate';
  value: string;
  changeValue: string;
  changeKey?: 'thisMonth';
  trend: 'up' | 'down';
}

export interface RevenuePoint {
  month: number;
  value: number;
}

export interface RecentProject {
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
}

export interface Deadline {
  titleKey: 'clientReview' | 'homepageDelivery' | 'kickoffMeeting';
  project: string;
  date: string;
  type: DeadlineType;
}
