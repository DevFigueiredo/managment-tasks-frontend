import { ProjectTask } from "./project-task";
import { Status } from "./status";

export interface Task {
  id: string;
  text: string;
  title: string;
  startDate?: string;
  endDate?: Date | string;
  statusId: string;
  Status: Status;
  ProjectTask?: ProjectTask[];
  createdAt?: string;
  updatedAt?: string;
  projectId: string;
  isNew?: boolean;
}
