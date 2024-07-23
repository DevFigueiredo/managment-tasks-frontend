import React, { createContext, useContext, useState, ReactNode } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { DetailTaskDrawer } from "@/components/DetailTaskDrawer";
import { Task } from "@/@core/domain/entities/task";

interface TaskContextProps {
  onOpen: (task: Task, projectId: string) => void;
  onClose: () => void;
}

export const TaskContext = createContext<TaskContextProps>({
  onClose: () => {},
  onOpen: () => {},
});

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [task, setTask] = useState<Task>({
    id: "",
    statusId: "",
    text: "",
    title: "",
    endDate: "",
    projectId: "",
    Status: Object.create({}),
  });
  const { isOpen, onOpen: openDrawer, onClose } = useDisclosure();
  const onOpen = (task: Task, projectId: string) => {
    setTask({ ...task, projectId });
    openDrawer();
  };

  return (
    <TaskContext.Provider value={{ onOpen, onClose }}>
      {children}
      <DetailTaskDrawer
        defaultIsOpen={false}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        task={task}
      />
    </TaskContext.Provider>
  );
};

export const useCreateTask = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
