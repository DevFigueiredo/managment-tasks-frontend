import React, { createContext, useContext, useState, ReactNode } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { DetailTaskDrawer } from "@/components/DetailTaskDrawer";
import { Task } from "@/@core/domain/task";
import { getStatus } from "@/utils/status";

interface CreateTaskContextProps {
  onOpen: (task: Task) => void;
  onClose: () => void;
}

const CreateTaskContext = createContext<CreateTaskContextProps | undefined>(
  undefined
);

export const CreateTaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [task, setTask] = useState<Task>({
    id: "",
    status: getStatus("Não Iniciada"),
    text: "",
    title: "",
  });
  const { isOpen, onOpen: openDrawer, onClose } = useDisclosure();
  const onOpen = (task: Task) => {
    setTask(task);
    openDrawer();
  };

  return (
    <CreateTaskContext.Provider value={{ onOpen, onClose }}>
      {children}
      <DetailTaskDrawer
        defaultIsOpen={false}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        task={task}
      />
    </CreateTaskContext.Provider>
  );
};

export const useCreateTask = (): CreateTaskContextProps => {
  const context = useContext(CreateTaskContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
