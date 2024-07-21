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
  IconButton,
} from "@chakra-ui/react";
import EditableTask from "../EditableTask";
import { reorder } from "@/utils/reorder";
import { Task } from "@/@core/domain/task";
import { useCreateTask } from "@/contexts/useCreateTaskContext";
import { MdDelete } from "react-icons/md";

interface Props {
  tasks: Task[];
  projectTitle: string;
  projectDescription: string;
  projectProgress: number; // Progress percentage
}

export default function ProjectList(props: Props): ReactElement {
  const [tasks, setTasks] = useState<Task[]>(props.tasks);
  const createTask = useCreateTask();

  function onDragEnd(result: DropResult): void {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);
    setTasks(items);
  }
  // Function to determine if a task is overdue or completed within the deadline
  function getTaskStatusColor(deadline: string, status: string): string {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    if (status === "Completed") {
      return deadlineDate >= now ? "green.100" : "red.100";
    }
    return deadlineDate < now ? "red.200" : "gray.100";
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
                            onClick={() => createTask.onOpen(task)}
                          />
                          <EditableTask.DueDate isDue={true} />
                          <EditableTask.DeleteButton onClick={() => {}} />
                        </EditableTask.Root>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided1.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </VStack>
    </Box>
  );
}
