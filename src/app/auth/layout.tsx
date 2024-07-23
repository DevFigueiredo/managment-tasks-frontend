"use client";

import { MobileNav, SidebarContent } from "@/components/Sidebar";
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthenticatedLayout({ children }: Props) {
  const disclosureSidebar = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => disclosureSidebar.onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={disclosureSidebar.isOpen}
        placement="left"
        onClose={disclosureSidebar.onClose}
        returnFocusOnClose={false}
        onOverlayClick={disclosureSidebar.onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={disclosureSidebar.onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={disclosureSidebar.onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}{" "}
      </Box>
    </Box>
  );
}
