"use client";
import React, { useCallback } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  UseDisclosureProps,
  List,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import EditableTask from "../EditableTask";
import { Task } from "@/@core/domain/entities/task";
import { useForm } from "react-hook-form";
import { useTask } from "@/hooks/useTask";
import { ControlledTextArea } from "../ControlledTextArea";
import ControlledInput from "../ControlledInput";

interface Props extends Required<Omit<UseDisclosureProps, "id" | "onOpen">> {
  task: Task;
  onOpen: (task: Task) => void;
}

export const DetailTaskDrawer: React.FC<Props> = ({
  defaultIsOpen,
  isOpen,
  onClose,
  task,
}) => {
  const { control } = useForm<Task>();
  const { updateTask } = useTask();
  const handleCreateOrUpdateTask = useCallback(
    (title: string, taskId: string) => {
      return updateTask({
        title,
        projectId: task.projectId,
        id: taskId,
        text: "",
        statusId: "",
      });
    },
    []
  );
  return (
    <Drawer
      isOpen={defaultIsOpen || isOpen}
      placement="right"
      onClose={onClose}
      size={"lg"} // Aumentando o tamanho do drawer
    >
      <DrawerOverlay />
      <DrawerContent padding={5}>
        <DrawerCloseButton />
        <DrawerHeader>Detalhes da Atividade</DrawerHeader>
        <Box pl={5} pr={5}>
          <EditableTask.Root>
            <EditableTask.Status status={task.Status} />
            <EditableTask.Item
              name="task"
              onEditEnd={(text) => {
                handleCreateOrUpdateTask(text, task.id);
              }}
              control={control}
              text={task.title}
              textSize="large"
              disabledControls={true}
            />
          </EditableTask.Root>
        </Box>
        <DrawerBody>
          <FormControl mb={4}>
            <FormLabel>Data Prazo</FormLabel>
            <ControlledInput
              name="endDate"
              control={control}
              placeholder="Prazo da atividade"
              size="md"
              type="datetime-local"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Anotação</FormLabel>
            <ControlledTextArea
              control={control}
              name="text"
              placeholder="Here is a sample placeholder"
              size="sm"
            />
            <FormHelperText></FormHelperText>
          </FormControl>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
