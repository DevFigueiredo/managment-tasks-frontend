import { ITaskHttpGateway } from "@/@core/domain/gateways/task.gateway-interface";
import qs from "qs";
import http from "../http";

export const TaskHttpGateway: ITaskHttpGateway.Gateway = {
  async get(
    params: ITaskHttpGateway.GetRequest
  ): Promise<ITaskHttpGateway.GetResponse> {
    const queryParameters = qs.stringify(params);
    const response = await http.get<ITaskHttpGateway.GetResponse>(
      `/tasks?${queryParameters}`
    );
    return response.data;
  },

  async getDetail(
    params: ITaskHttpGateway.GetDetailRequest
  ): Promise<ITaskHttpGateway.GetDetailResponse> {
    const response = await http.get<ITaskHttpGateway.GetDetailResponse>(
      `/tasks/${params.id}`
    );
    return response.data;
  },

  async create(
    params: ITaskHttpGateway.CreateRequest
  ): Promise<ITaskHttpGateway.CreateResponse> {
    const response = await http.post<ITaskHttpGateway.CreateResponse>(
      "/tasks",
      params
    );
    return response.data;
  },

  async update(params: ITaskHttpGateway.UpdateRequest): Promise<void> {
    await http.patch<void>(`/tasks/${params.id}`, params);
  },
  async updateTaskPositions(
    params: ITaskHttpGateway.UpdateTaskPositionRequest
  ): Promise<void> {
    await http.patch<void>(`/tasks/positions`, params);
  },
  async delete(params: ITaskHttpGateway.DeleteRequest): Promise<void> {
    await http.delete<ITaskHttpGateway.GetDetailResponse>(
      `/tasks/${params.id}`
    );
  },
};
