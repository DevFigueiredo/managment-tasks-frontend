"use client";
import React from "react";
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
  Textarea,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import EditableTask from "../EditableTask";
import { Task } from "@/@core/domain/task";

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
          <EditableTask.Root disabledBorder={true}>
            <EditableTask.Status status={task.status} />
            <EditableTask.Item text={task.title} textSize="large" />
          </EditableTask.Root>
        </Box>
        <DrawerBody>
          <FormControl mb={4}>
            <FormLabel>Data Prazo</FormLabel>
            <Input
              placeholder="Prazo da atividade"
              size="md"
              type="datetime-local"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Anotação</FormLabel>
            <Textarea placeholder="Here is a sample placeholder" size="sm" />
            <FormHelperText></FormHelperText>
          </FormControl>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
