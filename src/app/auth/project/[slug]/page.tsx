"use client";
import { Box } from "@chakra-ui/react";
import ProjectList from "@/components/ProjectList";
import { getStatus } from "@/utils/status";
import { useTask } from "@/hooks/useTask";
export interface Props {
  params: {
    slug: string;
  };
}

export default function ProjectPage(props: Props) {
  const { getTasks } = useTask();
  const { data: tasks } = getTasks(props.params.slug);
  return (
    <Box>
      <ProjectList
        projectId={props.params.slug}
        projectDescription="teste"
        projectProgress={60}
        projectTitle="TItulo"
        tasks={tasks}
      />
    </Box>
  );
}
