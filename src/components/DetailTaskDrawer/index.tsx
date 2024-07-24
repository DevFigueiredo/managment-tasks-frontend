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
import { useProject } from "@/hooks/useProject";
import { DateTime } from "luxon";
import { StatusTypeEnum } from "@/utils/status.enum";

interface Props extends Required<Omit<UseDisclosureProps, "id" | "onOpen">> {
  task: Task;
  onOpen: (task: Task, projectId: string) => void;
}

export const DetailTaskDrawer: React.FC<Props> = ({
  defaultIsOpen,
  isOpen,
  onClose,
  task,
}) => {
  const { control } = useForm<Task>();
  const { updateTask, getTasks } = useTask();
  const { detailProject } = useProject();
  const { refetch: refetchProject } = detailProject(task.projectId);

  const { refetch: refetch } = getTasks(task.projectId);
  const isDueDate =
    task.endDate &&
    DateTime.fromISO(task.endDate as string) <
      DateTime.local().startOf("day") &&
    task.Status.type !== StatusTypeEnum.closed;

  const handleUpdateTask = async (
    data: Partial<Pick<Task, "text" | "title" | "endDate" | "statusId">> &
      Pick<Task, "id" | "projectId">
  ) => {
    await updateTask({
      id: data.id,
      projectId: data.projectId,
      text: data.text,
      title: data.title,
      endDate: data.endDate,
      statusId: data.statusId,
    });
    refetchProject();
    refetch();
  };

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
            <EditableTask.Status
              onChange={(status) => {
                handleUpdateTask({
                  id: task.id,
                  statusId: status.id,
                  projectId: task.projectId,
                });
              }}
              status={task.Status}
            />
            <EditableTask.Item
              name="task"
              onEditEnd={(title) => {
                handleUpdateTask({
                  id: task.id,
                  title: title,
                  projectId: task.projectId,
                });
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
            <EditableTask.DueDate
              dueDate={task.endDate as Date}
              onDueDateChange={(v) =>
                handleUpdateTask({
                  id: task.id,
                  endDate: v,
                  projectId: task.projectId,
                })
              }
              isDue={!isDueDate}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Anotação</FormLabel>
            <ControlledTextArea
              control={control}
              name="text"
              placeholder="Here is a sample placeholder"
              size="sm"
              onChangeCapture={async (event: any) => {
                await handleUpdateTask({
                  id: task.id,
                  text: event.target.value,
                  projectId: task.projectId,
                });
              }}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
