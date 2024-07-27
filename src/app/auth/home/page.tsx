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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import { useProject } from "@/hooks/useProject";
import Link from "next/link";
import { Routes } from "@/utils/routes";
import { MdDelete } from "react-icons/md";
import DeleteProjectModal from "@/components/DeleteProjectModal";
import { DateTime } from "luxon";
import { ControlledDate } from "@/components/ControlledDate";
import { useForm } from "react-hook-form";

const HomePage = () => {
  const { showAddProjectModal, getProjects, deleteProject, updateProject } =
    useProject();
  const { data: projects = [], refetch, isFetching: isLoading } = getProjects();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [originalDate, setOriginalDate] = useState<string | null>(null);
  const cancelRef = React.useRef(null);
  const { control, setValue, getValues } = useForm();
  const toast = useToast();

  const onDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsAlertOpen(true);
  };

  const onConfirmDelete = async () => {
    if (projectToDelete) {
      try {
        await deleteProject(projectToDelete);
        setProjectToDelete(null);
        setIsAlertOpen(false);
        refetch();
      } catch (err) {
        setError("Erro ao excluir o projeto. Por favor, tente novamente.");
      }
    }
  };

  const onCloseAlert = () => {
    setProjectToDelete(null);
    setIsAlertOpen(false);
  };

  const handleDateChange = async (projectId: string, newDate: Date | null) => {
    if (newDate) {
      const today = DateTime.now().startOf("day");
      const selectedDate = DateTime.fromJSDate(newDate).startOf("day");

      if (selectedDate < today) {
        toast({
          title: "Data inválida.",
          description: "A data selecionada não pode estar no passado.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setValue(`project.${projectId}.endDate`, originalDate, {
          shouldDirty: true,
        });
        return;
      }

      try {
        await updateProject({ endDate: newDate.toISOString(), id: projectId });
        refetch();
      } catch (err) {
        toast({
          title: "Erro ao atualizar o projeto.",
          description:
            "Erro ao atualizar a data do projeto. Por favor, tente novamente.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setValue(`project.${projectId}.endDate`, originalDate, {
          shouldDirty: true,
        });
      }
    }
  };

  const tableBg = useColorModeValue("white", "gray.700");
  const headerBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  if (isLoading) {
    return (
      <Box p={4}>
        <Stack spacing={4}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="60px" />
          <Skeleton height="300px" />
          <Skeleton height="60px" />
          <Skeleton height="40px" width="200px" />
        </Stack>
      </Box>
    );
  }

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Flex direction="column" minH="100vh">
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Erro!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Box flex="1" overflowX="auto">
          <Table
            variant="simple"
            colorScheme="teal"
            bg={tableBg}
            borderWidth={1}
            borderColor={borderColor}
            size="sm"
          >
            <Thead bg={headerBg}>
              <Tr>
                <Th>Nome do Projeto</Th>
                <Th>Descrição</Th>
                <Th>Progresso</Th>
                <Th>Iniciado em</Th>
                <Th>Prazo</Th>
                <Th>Criado em</Th>
                <Th>Status</Th>
                <Th>Detalhes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(projects) && projects.length > 0 ? (
                projects?.map((project, index) => (
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
                      {DateTime.fromISO(
                        project.startDate as string
                      ).toLocaleString(DateTime.DATE_MED)}
                    </Td>
                    <Td>
                      <ControlledDate
                        defaultDate={
                          project.endDate ? new Date(project.endDate) : null
                        }
                        rules={{
                          required: "A data de término é obrigatória.",
                          validate: {
                            notInPast: (date) => {
                              const selectedDate = DateTime.fromJSDate(date);
                              const today = DateTime.now();
                              if (selectedDate < today) {
                                return "A data não pode estar no passado.";
                              }
                              return true;
                            },
                          },
                        }}
                        name={`project.${index}.endDate`}
                        control={control}
                        isDue={true}
                        onDateChange={(date) => {
                          setOriginalDate(
                            getValues(`project.${index}.endDate`)
                          );
                          handleDateChange(project.id, date);
                        }}
                      />
                    </Td>
                    <Td>
                      {DateTime.fromISO(project.createdAt).toLocaleString(
                        DateTime.DATE_MED
                      )}
                    </Td>
                    <Td>
                      {project.isDelayed ? "Em atraso" : "Dentro do Prazo"}
                    </Td>
                    <Td>
                      <Stack
                        direction={{ base: "column", md: "row" }}
                        spacing={2}
                        align="center"
                        justify="flex-start"
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
                ))
              ) : (
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    Nenhum projeto encontrado
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
          <Flex direction="row" justify="center" mt={6}>
            {isLoading ? (
              <Skeleton height="40px" width="200px" />
            ) : (
              <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                variant="solid"
                onClick={showAddProjectModal}
                size={buttonSize}
              >
                Adicionar Novo Projeto
              </Button>
            )}
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
