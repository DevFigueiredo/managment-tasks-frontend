// app/providers.tsx
"use client";

import { CreateSpaceProvider } from "@/contexts/useCreateSpaceContext";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <CreateSpaceProvider>{children}</CreateSpaceProvider>
    </ChakraProvider>
  );
}
