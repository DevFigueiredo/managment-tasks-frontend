"use client";
import { useProject } from "@/hooks/useProject";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Input,
  UseDisclosureProps,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import ControlledInput from "../ControlledInput";
import { useForm, Controller } from "react-hook-form";
import { ControlledTextArea } from "../ControlledTextArea";
import { ControlledDate } from "../ControlledDate";
import { DateTime } from "luxon";

interface FormValues {
  name: string;
  description?: string;
  endDate: Date;
}

interface Props extends Required<Omit<UseDisclosureProps, "id">> {}

const CreateProjectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultIsOpen,
}) => {
  const { createProject, getProjects } = useProject();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      endDate: new Date(), // Default date value
    },
    mode: "onBlur", // Validate on blur
  });
  const { refetch } = getProjects();
  const toast = useToast();

  const onSubmit = async (data: FormValues) => {
    try {
      await createProject({
        name: data.name,
        description: data.description,
        endDate: data.endDate,
      });
      refetch();
      reset(); // Clear form fields after successful submission
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Failed to create project", error);
      toast({
        title: "Erro ao criar projeto.",
        description:
          "Não foi possível criar o projeto. Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Watch the endDate field to calculate isDue
  const endDate = watch("endDate");
  const isDue = endDate ? new Date(endDate) <= new Date() : false;

  return (
    <Modal isOpen={isOpen || defaultIsOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Novo Projeto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="4">
            Para organizar suas tarefas de forma eficaz, crie um novo projeto
            fornecendo um nome, uma descrição opcional e uma data de término.
            Estes dados ajudarão a categorizar e gerenciar suas tarefas.
          </Text>
          <FormControl mb="4" isInvalid={!!errors.name}>
            <FormLabel>Nome do Projeto</FormLabel>
            <Stack direction="row" align="center">
              <ControlledInput
                name="name"
                control={control}
                placeholder="Nome do projeto, como marketing, engenharia, etc."
                isRequired
                rules={{ required: "O nome do projeto é obrigatório." }} // Validation rule
              />
            </Stack>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Descrição (opcional)</FormLabel>
            <ControlledTextArea
              name="description"
              control={control}
              placeholder="Forneça uma descrição detalhada do projeto, se desejar."
            />
          </FormControl>
          <FormControl mb="4" isInvalid={!!errors.endDate}>
            <FormLabel>Data de Término</FormLabel>
            <ControlledDate
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
              name={"endDate"}
              control={control}
              isDue={!isDue}
            />
            <FormErrorMessage>
              {errors.endDate && errors.endDate.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr="3" onClick={handleSubmit(onSubmit)}>
            Criar Projeto
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProjectModal;
