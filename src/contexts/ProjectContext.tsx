"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import CreateProjectModal from "@/components/CreateProjectModal";

export interface ProjectContextProps {
  onOpen: () => void;
  onClose: () => void;
}

export const ProjectContext = createContext<ProjectContextProps>({
  onClose: () => {},
  onOpen: () => {},
});

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ProjectContext.Provider value={{ onOpen, onClose }}>
      {children}
      <CreateProjectModal
        defaultIsOpen={false}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </ProjectContext.Provider>
  );
};
