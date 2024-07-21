import React, { createContext, useContext, useState, ReactNode } from "react";
import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import CreateSpaceModal from "@/components/CreateSpaceModal";

interface CreateSpaceContextProps {
  onOpen: () => void;
  onClose: () => void;
}

const CreateSpaceContext = createContext<CreateSpaceContextProps | undefined>(
  undefined
);

export const CreateSpaceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateSpaceContext.Provider value={{ onOpen, onClose }}>
      {children}
      <CreateSpaceModal
        defaultIsOpen={false}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </CreateSpaceContext.Provider>
  );
};

export const useCreateSpace = (): CreateSpaceContextProps => {
  const context = useContext(CreateSpaceContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
