import { Project } from "../entities/project";

export namespace IProjectHttpGateway {
  export type GetRequest = {};
  export type GetResponse = Project[];

  export type GetDetailRequest = {
    id: string;
  };
  export type GetDetailResponse = Project;

  export type CreateRequest = {
    name: string;
    description: string;
    endDate: string;
  };
  export type CreateResponse = { id: string };

  export type UpdateRequest = {
    id: string;
    name: string;
    description: string;
    endDate: string;
  };

  export interface Gateway {
    get(params?: GetRequest): Promise<GetResponse>;
    getDetail(params: GetDetailRequest): Promise<GetDetailResponse>;
    create(params: CreateRequest): Promise<CreateResponse>;
    update(params: UpdateRequest): Promise<void>;
  }
}
