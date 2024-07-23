import { ProjectTask } from "./project-task";
import { Status } from "./status";

export interface Task {
  id: string;
  text: string;
  title: string;
  startDate?: string | Date;
  endDate?: Date | string;
  statusId: string;
  Status: Status;
  ProjectTask?: ProjectTask[];
  createdAt?: string;
  updatedAt?: string;
  projectId: string;
  isNew?: boolean;
}
