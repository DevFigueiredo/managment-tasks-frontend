"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import { useProject } from "@/hooks/useProject";
import Link from "next/link";
import { Routes } from "@/utils/routes";

const HomePage = () => {
  const { showAddProjectModal, getProjects } = useProject();
  const { data: projects } = getProjects();

  // Define colors for light and dark modes
  const tableBg = useColorModeValue("white", "gray.700");
  const headerBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        <Box overflowX="auto">
          <Table
            variant="simple"
            colorScheme="teal"
            bg={tableBg}
            borderWidth={1}
            borderColor={borderColor}
          >
            <Thead bg={headerBg}>
              <Tr>
                <Th>Nome do Projeto</Th>
                <Th>Descrição</Th>
                <Th>Progresso</Th>
                <Th>Detalhes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects?.map((project) => (
                <Tr key={project.id}>
                  <Td>{project.name}</Td>
                  <Td>{project.name}</Td>
                  <Td>
                    <Progress
                      value={project.completionPercentage}
                      colorScheme="teal"
                      size="sm"
                      borderRadius="md"
                      hasStripe
                    />
                    <Text mt={1} fontSize="sm" color="gray.600">
                      {project.completionPercentage}%
                    </Text>
                  </Td>
                  <Td>
                    <Link href={`${Routes.DetailProject}/${project.id}`}>
                      <IconButton
                        aria-label="Detalhar Projeto"
                        icon={<ViewIcon />}
                        colorScheme="teal"
                      />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={showAddProjectModal}
          alignSelf="center"
        >
          Adicionar Novo Projeto
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;