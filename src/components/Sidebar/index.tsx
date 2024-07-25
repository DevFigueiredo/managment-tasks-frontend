"use client";

import { useState } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
  BoxProps,
  FlexProps,
  IconButton,
  HStack,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { FiHome, FiMenu } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import { useProject } from "@/hooks/useProject";
import { Routes } from "@/utils/routes";
import { NavItem } from "../NavItem";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { showAddProjectModal, getProjects } = useProject();
  const { data: projects } = getProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.800")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.600")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflowY="auto" // Adiciona rolagem se necessário
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Artia
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <VStack
        spacing={4}
        align="stretch"
        mx="4"
        mt={4}
        divider={
          <StackDivider
            borderColor={useColorModeValue("gray.200", "gray.600")}
          />
        }
      >
        <NavItem
          onClick={() => {
            setSelectedProjectId(null);
            onClose();
          }}
          icon={FiHome}
          href={Routes.Home}
        >
          Início
        </NavItem>

        <Box>
          <Text
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
            mb={2}
          >
            Meus Projetos
          </Text>
          <VStack spacing={2} align="stretch">
            {projects?.length &&
              projects?.map((project) => (
                <NavItem
                  href={`${Routes.DetailProject}/${project.id}`}
                  key={project.id}
                  icon={FiHome}
                  borderRadius="md"
                  p={3}
                  isActive={selectedProjectId === project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  {project.name}
                </NavItem>
              ))}
          </VStack>
        </Box>

        <NavItem icon={MdAddCircleOutline} onClick={showAddProjectModal}>
          Adicionar Projeto
        </NavItem>
      </VStack>
    </Box>
  );
};

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Artia
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}></HStack>
    </Flex>
  );
};
