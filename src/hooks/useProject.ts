import { Project } from "@/@core/domain/project";
import { ProjectContext } from "@/contexts/ProjectContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

const initialProjects: Project[] = [
  { id: "1", name: "Projeto A", progress: 50, description: "" },
  { id: "2", name: "Projeto B", progress: 80, description: "" },
];

export function useProject() {
  const projectContext = useContext(ProjectContext);

  function getProjects() {
    return useQuery({
      queryKey: ["projects"],
      queryFn: async () => initialProjects,
    });
  }
  function showAddProjectModal() {
    projectContext.onOpen();
  }
  function createProject() {}

  return { getProjects, showAddProjectModal, createProject };
}
