import { IProjectHttpGateway } from "@/@core/domain/gateways/project.gateway-interface";
import qs from "qs";
import http from "../http";

export const ProjectHttpGateway: IProjectHttpGateway.Gateway = {
  async get(
    params?: IProjectHttpGateway.GetRequest
  ): Promise<IProjectHttpGateway.GetResponse> {
    const queryParameters = qs.stringify(params);
    const response = await http.get<IProjectHttpGateway.GetResponse>(
      `/projects?${queryParameters}`
    );
    return response.data;
  },

  async getDetail(
    params: IProjectHttpGateway.GetDetailRequest
  ): Promise<IProjectHttpGateway.GetDetailResponse> {
    const response = await http.get<IProjectHttpGateway.GetDetailResponse>(
      `/projects/${params.id}`
    );
    return response.data;
  },

  async delete(params: IProjectHttpGateway.DeleteRequest): Promise<void> {
    await http.delete<IProjectHttpGateway.GetDetailResponse>(
      `/projects/${params.id}`
    );
  },

  async create(
    params: IProjectHttpGateway.CreateRequest
  ): Promise<IProjectHttpGateway.CreateResponse> {
    const response = await http.post<IProjectHttpGateway.CreateResponse>(
      "/projects",
      params
    );
    return response.data;
  },

  async update(params: IProjectHttpGateway.UpdateRequest): Promise<void> {
    await http.patch<void>(`/projects/${params.id}`, params);
  },
};
