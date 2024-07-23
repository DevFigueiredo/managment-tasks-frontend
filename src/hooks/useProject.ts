import { Project } from "@/@core/domain/entities/project";
import { ProjectHttpGateway } from "@/@core/infra/gateways/project.gateway";
import { ProjectContext } from "@/contexts/ProjectContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext } from "react";

export function useProject() {
  const projectContext = useContext(ProjectContext);
  const queryClient = useQueryClient();

  const getProjects = useCallback(() => {
    return useQuery({
      queryKey: ["projects"],
      queryFn: async () => {
        const projects = await ProjectHttpGateway.get();
        return projects;
      },
      refetchOnWindowFocus: true,
    });
  }, []);

  const detailProject = useCallback((projectId: string) => {
    return useQuery({
      queryKey: [projectId],
      queryFn: async () => {
        const project = await ProjectHttpGateway.getDetail({ id: projectId });
        return project;
      },
      refetchOnWindowFocus: true,
    });
  }, []);

  const updateProject = useCallback(
    async (project: Omit<Partial<Project>, "id"> & Pick<Project, "id">) => {
      const projects = await ProjectHttpGateway.update({
        ...project,
        endDate: project.endDate as string,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      return projects;
    },
    [queryClient]
  );

  const deleteProject = useCallback(
    async (projectId: string) => {
      await ProjectHttpGateway.delete({
        id: projectId,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    [queryClient]
  );

  const createProject = useCallback(
    async (project: Pick<Project, "name" | "description" | "endDate">) => {
      await ProjectHttpGateway.create({
        ...project,
        endDate: project.endDate as string,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    [queryClient]
  );

  function showAddProjectModal() {
    projectContext.onOpen();
  }

  return {
    getProjects,
    showAddProjectModal,
    createProject,
    detailProject,
    updateProject,
    deleteProject,
  };
}
