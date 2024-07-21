import { ProjectContext } from "@/contexts/ProjectContext";
import { useContext } from "react";

export function useProject() {
  const projectContext = useContext(ProjectContext);

  function getProjects() {}
  function showAddProjectModal() {
    projectContext.onOpen();
  }
  function createProject() {}

  return { getProjects, showAddProjectModal, createProject };
}
