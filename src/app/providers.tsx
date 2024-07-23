"use client";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { TaskProvider } from "@/contexts/TaskContext";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ProjectProvider>
          <TaskProvider>{children}</TaskProvider>
        </ProjectProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
