"use client";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Box,
  Heading,
  Text,
  Progress,
  VStack,
  Divider,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import EditableTask from "../EditableTask";
import { reorder } from "@/utils/reorder";
import { Task } from "@/@core/domain/entities/task";
import { useTask } from "@/hooks/useTask";
import { CustomButton } from "../CustomButton";
import { useForm } from "react-hook-form";
import { useStatus } from "@/hooks/useStatus";
import { DateTime } from "luxon";
import { StatusTypeEnum } from "@/utils/status.enum";
import { generateUUID } from "@/utils/generate-uuid";
import { useProject } from "@/hooks/useProject";
import { Project } from "@/@core/domain/entities/project";

interface Props {
  projectId: string;
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
  const { detailProject } = useProject();
  const { control } = useForm<Task[]>({ mode: "onChange" });
  const defaultStatus = statusList?.find((item) => item.default);
  const {
    data: tasksData,
    refetch,
    isLoading: isLoadingTasks,
  } = getTasks(props.projectId);
  const [tasks, setTasks] = useState<Task[]>();
  const {
    data: project,
    refetch: refetchProject,
    isLoading,
  } = detailProject(props.projectId);
  useEffect(() => {
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
    if (defaultStatus?.id) {
      try {
        const newTask: Task = {
          id: generateUUID(),
          title: "Nova Tarefa",
          text: "",
          statusId: defaultStatus.id,
          isNew: true,
          projectId: props.projectId,
          Status: {
            ...defaultStatus,
          },
        };

        // Adiciona a nova tarefa e obtém o ID
        const { id } = await addTask(newTask);
        newTask.id = id;

        // Adiciona a nova tarefa à lista de tarefas
        const updatedTasks = [...(tasks || []), newTask];
        setTasks(updatedTasks);

        // Atualiza as posições das tarefas na API
        const tasksWithPosition = updatedTasks.map((task, index) => ({
          taskId: task.id,
          position: index,
        }));

        updateTaskPosition({
          projectId: props.projectId,
          tasks: tasksWithPosition,
        });
      } catch (error) {
        console.error("Erro ao adicionar tarefa ou atualizar posições:", error);
      }
    }
  }, [addTask, defaultStatus, props.projectId, tasks, updateTaskPosition]);
  const handleDeleteTask = useCallback(
    async (taskId: string, projectId: string) => {
      try {
        deleteTask(taskId, projectId);
      } catch (error) {
        console.error("Erro ao deletar a tarefa:", error);
      }
    },
    []
  );

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
  if (isLoading && isLoadingTasks) {
    return (
      <Box p={4}>
        <Stack>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="60px" />
          <Skeleton height="300px" />
          <Skeleton height="60px" />
        </Stack>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {/* Project Information */}
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            {project?.name}
          </Heading>
          <Text>{project?.description}</Text>
          <Divider my={4} />
          {project && (
            <Box>
              <Text mb={2}>Progresso do Projeto:</Text>
              <Progress
                value={project?.completionPercentage || 0}
                size="lg"
                colorScheme="teal"
              />
              <Text mt={2} fontSize="sm" color="gray.600">
                {project?.completionPercentage || 0}% Completo
              </Text>
            </Box>
          )}
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
                {tasks?.map((task, index) => {
                  const isDueDate =
                    task.endDate &&
                    DateTime.fromISO(task.endDate as string) <
                      DateTime.local().startOf("day") &&
                    task.Status.type !== StatusTypeEnum.closed;

                  return (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
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
                          <EditableTask.Root
                            code={task.id}
                            startDate={task.startDate as Date}
                          >
                            <EditableTask.Draggable />
                            <EditableTask.Status
                              onChange={(status) => {
                                handleUpdateTask({
                                  id: task.id,
                                  statusId: status.id,
                                  projectId: props.projectId,
                                });
                              }}
                              status={task.Status}
                            />
                            <EditableTask.Item
                              name={`task.${index}.title`}
                              control={control}
                              text={task.title}
                              onClick={() =>
                                showOpenTaskModal(task, props.projectId)
                              }
                              isEditMode={task.isNew || false}
                              onEditEnd={(text) => {
                                setTasks(
                                  tasks.map((v) => ({ ...v, isNew: false }))
                                );
                                handleUpdateTask({
                                  id: task.id,
                                  title: text,
                                  projectId: props.projectId,
                                });
                              }}
                            />
                            <EditableTask.DueDate
                              dueDate={task.endDate as Date}
                              onDueDateChange={(v) =>
                                handleUpdateTask({
                                  id: task.id,
                                  endDate: v,
                                  projectId: props.projectId,
                                })
                              }
                              isDue={!isDueDate}
                            />
                            <EditableTask.DeleteButton
                              onClick={() =>
                                handleDeleteTask(task.id, props.projectId)
                              }
                            />
                          </EditableTask.Root>
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
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
