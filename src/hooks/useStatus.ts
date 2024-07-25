"use client";
import { StatusHttpGateway } from "@/@core/infra/gateways/status.gateway";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export function useStatus() {
  const getStatus = useCallback(() => {
    return useQuery({
      queryKey: ["status"],
      queryFn: async () => {
        const status = await StatusHttpGateway.get();
        return status;
      },
    });
  }, []);

  return { getStatus };
}
