export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string | Date;
  createdAt: string;
  updatedAt: string;
  completionPercentage: number;
  isDelayed: boolean;
}
