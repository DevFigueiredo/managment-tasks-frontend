import { Status } from "../entities/status";

export namespace IStatusHttpGateway {
  export type GetRequest = {
    projectId: string;
  };
  export type GetResponse = Status[];
  export interface Gateway {
    get(params?: GetRequest): Promise<GetResponse>;
  }
}
