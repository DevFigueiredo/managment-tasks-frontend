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
  const { data: projects, refetch } = getProjects(); // Utilize o refetch para recarregar os dados
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros
  const [originalDate, setOriginalDate] = useState<string | null>(null); // Estado para armazenar a data original
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
        refetch(); // Refetch projects after deletion
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

      // Retrieve the current endDate from form values
      const currentEndDate = getValues(`project.${projectId}.endDate`);
      const currentEndDateTime = DateTime.fromISO(currentEndDate);

      // Validate that the new endDate is not in the past
      if (selectedDate < today) {
        toast({
          title: "Data inválida.",
          description: "A data selecionada não pode estar no passado.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // Revert the value to the original date
        setValue(`project.${projectId}.endDate`, originalDate, {
          shouldDirty: true,
        });
        return;
      }

      try {
        await updateProject({ endDate: newDate.toISOString(), id: projectId });
        refetch(); // Refetch projects to get updated data
      } catch (err) {
        toast({
          title: "Erro ao atualizar o projeto.",
          description:
            "Erro ao atualizar a data do projeto. Por favor, tente novamente.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // Revert the value to the original date
        setValue(`project.${projectId}.endDate`, originalDate, {
          shouldDirty: true,
        });
      }
    }
  };

  // Define colors for light and dark modes
  const tableBg = useColorModeValue("white", "gray.700");
  const headerBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* <Flex direction="column" minH="100vh">
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
            size="sm" // Ajuste o tamanho da tabela para se adequar ao layout
          >
            <Thead bg={headerBg}>
              <Tr>
                <Th>Nome do Projeto</Th>
                <Th>Descrição</Th>
                <Th>Progresso</Th>
                <Th>Iniciado em</Th>
                <Th>Prazo</Th>
                <Th>Criado em</Th>
                <Th>Detalhes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects?.length &&
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
                          // Save the original date before changing
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
      /> */}
    </Box>
  );
};

export default HomePage;
