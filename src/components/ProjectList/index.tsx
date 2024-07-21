import { ReactElement, useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Box,
  Heading,
  Text,
  Progress,
  VStack,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import EditableTask from "../EditableTask";
import { reorder } from "@/utils/reorder";
import { Task } from "@/@core/domain/task";
import { useTask } from "@/hooks/useTask";
import AddTask from "../AddTask"; // Certifique-se de que o caminho esteja correto
import { getStatus } from "@/utils/status";
import { generateUUID } from "@/utils/generate-uuid";
import { useToast } from "@chakra-ui/react";

interface Props {
  tasks: Task[];
  projectTitle: string;
  projectDescription: string;
  projectProgress: number; // Progress percentage
}

export default function ProjectList(props: Props): ReactElement {
  const [tasks, setTasks] = useState<Task[]>(props.tasks);
  const { showOpenTaskModal } = useTask();
  const toast = useToast(); // Hook para exibir o toast

  function onDragEnd(result: DropResult): void {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);
    setTasks(items);
  }
  function handleAddTask(): void {
    const newTask: Task = {
      id: generateUUID(),
      title: "",
      deadline: "",
      text: "",
      status: getStatus("Não Iniciada"),
      isNew: true, // Exemplo de flag
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Tarefa criada",
      description: "A nova tarefa foi criada com sucesso.",
      status: "success",
      duration: 7000, // Tempo em que o toast ficará visível
      isClosable: true,
      render: () => (
        <Box
          p={3}
          bg="teal.500"
          color="white"
          borderRadius="md"
          boxShadow="md"
          display="flex"
          flexDirection="column" // Alinha os elementos verticalmente
        >
          <Box>
            <Text fontWeight="bold">Tarefa criada</Text>
            <Text>A nova tarefa foi criada com sucesso.</Text>
          </Box>
          <Button colorScheme="teal" onClick={() => showOpenTaskModal(newTask)}>
            Visualizar Tarefa
          </Button>
        </Box>
      ),
    });
  }

  function handleCreateOrUpdateTask() {}
  function handleDeleteTask(taskId: string): void {
    // Filtra a lista de tarefas para remover a tarefa com o ID fornecido
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    // Exibir o toast confirmando a exclusão
    toast({
      title: "Tarefa excluída",
      description: "A tarefa foi removida com sucesso.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {/* Project Information */}
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            {props.projectTitle}
          </Heading>
          <Text>{props.projectDescription}</Text>
          <Divider my={4} />
          <Box>
            <Text mb={2}>Progresso do Projeto:</Text>
            <Progress
              value={props.projectProgress}
              size="lg"
              colorScheme="teal"
            />
            <Text mt={2} fontSize="sm" color="gray.600">
              {props.projectProgress}% Completo
            </Text>
          </Box>
        </Box>

        {/* Task List */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" type="TASK" direction="vertical">
            {(provided1) => (
              <Box
                ref={provided1.innerRef}
                {...provided1.droppableProps}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        p={3}
                        mb={2}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor="gray.200"
                        bg="white"
                        boxShadow="sm"
                      >
                        <EditableTask.Root>
                          <EditableTask.Draggable />
                          <EditableTask.Status status={task.status} />
                          <EditableTask.Item
                            text={task.title}
                            onClick={() => showOpenTaskModal(task)}
                            isEditMode={task.isNew}
                          />
                          <EditableTask.DueDate isDue={true} />
                          <EditableTask.DeleteButton
                            onClick={() => handleDeleteTask(task.id)}
                          />
                        </EditableTask.Root>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided1.placeholder}

                {/* Componente para adicionar nova tarefa */}
                <AddTask onClick={handleAddTask} />
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </VStack>
    </Box>
  );
}
