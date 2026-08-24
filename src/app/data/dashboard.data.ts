import { DashboardStat, Deadline, RecentProject, RevenuePoint } from '../models/dashboard.model';

export const DASHBOARD_STATS: DashboardStat[] = [
  {
    key: 'revenue',
    value: '€12,480',
    changeValue: '+12.5%',
    trend: 'up',
  },
  {
    key: 'activeProjects',
    value: '8',
    changeValue: '+2',
    changeKey: 'thisMonth',
    trend: 'up',
  },
  {
    key: 'clients',
    value: '14',
    changeValue: '+3',
    changeKey: 'thisMonth',
    trend: 'up',
  },
  {
    key: 'completionRate',
    value: '82%',
    changeValue: '+4.2%',
    trend: 'up',
  },
];

export const REVENUE_DATA: RevenuePoint[] = [
  { month: 3, value: 5200 },
  { month: 4, value: 6800 },
  { month: 5, value: 6100 },
  { month: 6, value: 8400 },
  { month: 7, value: 9600 },
  { month: 8, value: 12480 },
];

export const RECENT_PROJECTS: RecentProject[] = [
  {
    name: 'Luma Website',
    client: 'Luma Studio',
    status: 'in-progress',
    progress: 72,
    dueDate: '2026-09-08',
  },
  {
    name: 'North Dashboard',
    client: 'North Labs',
    status: 'review',
    progress: 91,
    dueDate: '2026-09-02',
  },
  {
    name: 'Mira Commerce',
    client: 'Mira Goods',
    status: 'in-progress',
    progress: 48,
    dueDate: '2026-09-18',
  },
  {
    name: 'Arco Identity',
    client: 'Arco Group',
    status: 'completed',
    progress: 100,
    dueDate: '2026-08-24',
  },
];

export const UPCOMING_DEADLINES: Deadline[] = [
  {
    titleKey: 'clientReview',
    project: 'North Dashboard',
    date: '2026-08-27',
    type: 'review',
  },
  {
    titleKey: 'homepageDelivery',
    project: 'Luma Website',
    date: '2026-09-08',
    type: 'delivery',
  },
  {
    titleKey: 'kickoffMeeting',
    project: 'Nova CRM',
    date: '2026-09-11',
    type: 'meeting',
  },
];
