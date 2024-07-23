import { Project } from "@/@core/domain/entities/project";
import { ProjectHttpGateway } from "@/@core/infra/gateways/project.gateway";
import { StatusHttpGateway } from "@/@core/infra/gateways/status.gateway";
import { ProjectContext } from "@/contexts/ProjectContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export function useStatus() {
  function getStatus() {
    return useQuery({
      queryKey: ["status"],
      queryFn: async () => {
        const status = await StatusHttpGateway.get();
        return status;
      },
    });
  }

  return { getStatus };
}
