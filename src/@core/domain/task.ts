import { IStatus } from "@/utils/status";

export class Task {
  id!: string;
  status!: IStatus;
  text!: string;
  title!: string;
  deadline!: string;
  isNew?: boolean;
}
