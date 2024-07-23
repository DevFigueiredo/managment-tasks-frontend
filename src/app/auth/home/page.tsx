"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Progress,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  IconButton,
  useColorModeValue,
  Stack,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import { useProject } from "@/hooks/useProject";
import Link from "next/link";
import { Routes } from "@/utils/routes";
import EditableTask from "@/components/EditableTask";
import { MdDelete } from "react-icons/md";
import DeleteProjectModal from "@/components/DeleteProjectModal";
import { DateTime } from "luxon";

const HomePage = () => {
  const { showAddProjectModal, getProjects, deleteProject } = useProject();
  const { data: projects, refetch } = getProjects(); // Utilize o refetch para recarregar os dados
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const cancelRef = React.useRef(null);

  const onDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsAlertOpen(true);
  };

  const onConfirmDelete = async () => {
    if (projectToDelete) {
      await deleteProject(projectToDelete);
      setProjectToDelete(null);
      setIsAlertOpen(false);
      refetch(); // Refetch projects after deletion
    }
  };

  const onCloseAlert = () => {
    setProjectToDelete(null);
    setIsAlertOpen(false);
  };

  // Define colors for light and dark modes
  const tableBg = useColorModeValue("white", "gray.700");
  const headerBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Flex direction="column" minH="100vh">
        <Box flex="1" overflowX="auto">
          <Table
            variant="simple"
            colorScheme="teal"
            bg={tableBg}
            borderWidth={1}
            borderColor={borderColor}
            size="sm" // Ajuste o tamanho da tabela para se adequar ao layout
          >
            <Thead bg={headerBg}>
              <Tr>
                <Th>Nome do Projeto</Th>
                <Th>Descrição</Th>
                <Th>Progresso</Th>
                <Th>Prazo</Th>
                <Th>Criado em</Th>
                <Th>Detalhes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects?.map((project) => (
                <Tr key={project.id}>
                  <Td>{project.name}</Td>
                  <Td>{project.description}</Td>
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
                    <EditableTask.DueDate
                      dueDate={project.endDate as Date}
                      onDueDateChange={(v) => {}}
                      isDue={false}
                    />
                  </Td>
                  <Td>
                    {DateTime.fromISO(project.createdAt).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </Td>
                  <Td>
                    <Stack
                      direction={{ base: "column", md: "row" }} // Layout flexível
                      spacing={2} // Espaçamento entre os botões
                      align="center" // Alinha os botões verticalmente
                      justify="flex-start" // Alinha os botões horizontalmente
                    >
                      <Link href={`${Routes.DetailProject}/${project.id}`}>
                        <IconButton
                          aria-label="Detalhar Projeto"
                          icon={<ViewIcon />}
                          colorScheme="teal"
                          size={buttonSize}
                        />
                      </Link>
                      <IconButton
                        aria-label="Deletar Projeto"
                        icon={<MdDelete />}
                        colorScheme="red"
                        size={buttonSize}
                        onClick={() => onDeleteClick(project.id)}
                      />
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex
            direction="row"
            justify="center" // Centraliza o botão horizontalmente
            mt={6} // Margem superior para afastar da tabela
          >
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              variant="solid"
              onClick={showAddProjectModal}
              size={buttonSize} // Ajusta o tamanho do botão com base na tela
            >
              Adicionar Novo Projeto
            </Button>
          </Flex>
        </Box>
      </Flex>

      <DeleteProjectModal
        isDeleteOpen={isAlertOpen}
        onDeleteClose={onCloseAlert}
        onConfirmDelete={onConfirmDelete}
        projectToDelete={projectToDelete}
        setProjectToDelete={setProjectToDelete}
        cancelRef={cancelRef}
      />
    </Box>
  );
};

export default HomePage;
