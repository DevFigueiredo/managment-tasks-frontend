export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: string | Date;
  endDate?: string | Date;
  createdAt: string;
  updatedAt: string;
  completionPercentage: number;
  isDelayed: boolean;
}
