import { IStatusHttpGateway } from "@/@core/domain/gateways/status.gateway-interface";
import qs from "qs";
import http from "../http";

export const StatusHttpGateway: IStatusHttpGateway.Gateway = {
  async get(
    params?: IStatusHttpGateway.GetRequest
  ): Promise<IStatusHttpGateway.GetResponse> {
    const queryParameters = qs.stringify(params);
    const response = await http.get<IStatusHttpGateway.GetResponse>(
      `/status?${queryParameters}`
    );
    return response.data;
  },
};
