"use client";
import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
interface Props {
  isDeleteOpen: boolean;
  onDeleteClose: () => void;
  onConfirmDelete: () => void;
  projectToDelete: string | null;
  setProjectToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  cancelRef: React.RefObject<HTMLElement>;
}
const DeleteProjectModal: React.FC<Props> = ({
  isDeleteOpen,
  onDeleteClose,
  onConfirmDelete,
  cancelRef,
}) => {
  return (
    <AlertDialog
      isOpen={isDeleteOpen}
      leastDestructiveRef={cancelRef}
      onClose={onDeleteClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar Projeto
          </AlertDialogHeader>
          <AlertDialogBody>
            Tem certeza que deseja deletar este projeto? Esta ação não pode ser
            desfeita.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef as any} onClick={onDeleteClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteProjectModal;
