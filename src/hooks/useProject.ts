import { Project } from "@/@core/domain/entities/project";
import { ProjectHttpGateway } from "@/@core/infra/gateways/project.gateway";
import { ProjectContext } from "@/contexts/ProjectContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export function useProject() {
  const projectContext = useContext(ProjectContext);
  function getProjects() {
    return useQuery({
      queryKey: ["projects"],
      queryFn: async () => {
        const projects = await ProjectHttpGateway.get();
        return projects;
      },
    });
  }

  function showAddProjectModal() {
    projectContext.onOpen();
  }
  function createProject() {}

  return { getProjects, showAddProjectModal, createProject };
}
