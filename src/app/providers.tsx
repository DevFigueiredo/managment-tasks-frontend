// app/providers.tsx
"use client";

import { CreateSpaceProvider } from "@/contexts/useCreateSpaceContext";
import { CreateTaskProvider } from "@/contexts/useCreateTaskContext";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <CreateSpaceProvider>
        <CreateTaskProvider>{children}</CreateTaskProvider>
      </CreateSpaceProvider>
    </ChakraProvider>
  );
}
