"use client";
import { Box } from "@chakra-ui/react";
import ProjectList from "@/components/ProjectList";
export interface Props {
  params: {
    slug: string;
  };
}

export default function ProjectPage(props: Props) {
  return (
    <Box>
      <ProjectList projectId={props.params.slug} />
    </Box>
  );
}
