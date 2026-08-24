export type ProjectStatus = 'planning' | 'in-progress' | 'review' | 'completed';

export type ProjectDescriptionKey =
  'lumaWebsite' | 'northDashboard' | 'miraCommerce' | 'arcoIdentity' | 'novaCrm' | 'formaJournal';

export interface Project {
  id: number;
  name: string;
  client: string;

  description?: string;
  descriptionKey?: ProjectDescriptionKey;

  status: ProjectStatus;
  progress: number;
  dueDate: string;
  budget: number;
}

export interface CreateProjectInput {
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  dueDate: string;
  budget: number;
}
