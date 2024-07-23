import { ReactElement, useCallback, useEffect, useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Box,
  Heading,
  Text,
  Progress,
  VStack,
  Divider,
} from "@chakra-ui/react";
import EditableTask from "../EditableTask";
import { reorder } from "@/utils/reorder";
import { Task } from "@/@core/domain/entities/task";
import { useTask } from "@/hooks/useTask";
import { CustomButton } from "../CustomButton";
import { useForm } from "react-hook-form";
import { useStatus } from "@/hooks/useStatus";

interface Props {
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  projectProgress: number; // Progress percentage
}

export default function ProjectList(props: Props): ReactElement {
  const {
    getTasks,
    updateTask,
    showOpenTaskModal,
    addTask,
    deleteTask,
    updateTaskPosition,
  } = useTask();
  const { getStatus } = useStatus();
  const { data: statusList } = getStatus();
  const { control } = useForm<Task[]>({ mode: "onChange" });
  const defaultStatusId = statusList?.find((item) => item.default)?.id;
  const { data: tasksData } = getTasks(props.projectId);
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    console.log("mudou o estado");
    setTasks(tasksData);
  }, [tasksData]);
  function onDragEnd(result: DropResult): void {
    if (!result.destination || !tasks?.length) {
      return;
    }

    const reorderedTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    // Atualiza o estado com a lista reordenada
    setTasks(reorderedTasks);

    // Chama a API para atualizar as posições das tarefas
    updateTaskPosition({
      projectId: props.projectId,
      tasks: reorderedTasks.map((task, index) => ({
        taskId: task.id,
        position: index,
      })),
    });
  }

  const handleAddTask = useCallback(async () => {
    if (defaultStatusId) {
      try {
        addTask(props.projectId, defaultStatusId);

        if (tasks?.length) {
          const tasksWithPosition = tasks.map((task, index) => {
            return {
              taskId: task.id,
              position: index,
            };
          });

          // Atualizar as posições das tarefas na API
          updateTaskPosition({
            projectId: props.projectId,
            tasks: tasksWithPosition,
          });
        }
      } catch (error) {
        console.error("Erro ao adicionar tarefa ou atualizar posições:", error);
      }
    }
  }, [addTask, defaultStatusId, props.projectId, getTasks, updateTaskPosition]);

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
                {tasks?.map((task, index) => (
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
                        <EditableTask.Root code={task.id}>
                          <EditableTask.Draggable />
                          <EditableTask.Status status={task.Status} />
                          <EditableTask.Item
                            name={`task.${index}.title`}
                            control={control}
                            text={task.title}
                            onClick={() => showOpenTaskModal(task)}
                            isEditMode={task.isNew || false}
                            onEditEnd={(text) => {
                              updateTask({
                                id: task.id,
                                statusId: task.statusId,
                                title: text,
                                projectId: props.projectId,
                              });
                            }}
                          />
                          <EditableTask.DueDate isDue={true} />
                          <EditableTask.DeleteButton
                            onClick={() => deleteTask(task.id, props.projectId)}
                          />
                        </EditableTask.Root>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided1.placeholder}

                <CustomButton
                  onClick={handleAddTask}
                  disabled={!!tasks?.find((item) => item.isNew)}
                >
                  Adicionar Tarefa
                </CustomButton>
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </VStack>
    </Box>
  );
}
