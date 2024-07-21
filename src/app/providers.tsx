// app/providers.tsx
"use client";

import { ProjectProvider } from "@/contexts/ProjectContext";
import { TaskProvider } from "@/contexts/TaskContext";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <ProjectProvider>
        <TaskProvider>{children}</TaskProvider>
      </ProjectProvider>
    </ChakraProvider>
  );
}
