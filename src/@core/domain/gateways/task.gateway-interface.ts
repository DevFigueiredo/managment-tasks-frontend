import { Task } from "../entities/task";

export namespace ITaskHttpGateway {
  export type GetRequest = {
    projectId: string;
  };
  export type GetResponse = Task[];

  export type GetDetailRequest = {
    id: string;
  };
  export type GetDetailResponse = Task;

  export type CreateRequest = Pick<
    Task,
    "text" | "title" | "endDate" | "statusId" | "projectId"
  >;
  export type CreateResponse = { id: string };

  export type UpdateRequest = {
    id: string;
    projectId: string;
    text?: string;
    title?: string;
    endDate?: string;
    statusId: string;
  };

  export type UpdateTaskPositionRequest = {
    projectId: string;
    tasks: {
      position: number;
      taskId: string;
    }[];
  };

  export type DeleteRequest = {
    id: string;
  };

  export interface Gateway {
    get(params: GetRequest): Promise<GetResponse>;
    getDetail(params: GetDetailRequest): Promise<GetDetailResponse>;
    create(params: CreateRequest): Promise<CreateResponse>;
    update(params: UpdateRequest): Promise<void>;
    delete(params: DeleteRequest): Promise<void>;
    updateTaskPositions(
      params: ITaskHttpGateway.UpdateTaskPositionRequest
    ): Promise<void>;
  }
}
