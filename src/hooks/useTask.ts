import { Task } from "@/@core/domain/entities/task";
import { ITaskHttpGateway } from "@/@core/domain/gateways/task.gateway-interface";
import { TaskHttpGateway } from "@/@core/infra/gateways/task.gateway";
import { TaskContext } from "@/contexts/TaskContext";
import { generateUUID } from "@/utils/generate-uuid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext } from "react";

export function useTask() {
  const taskContext = useContext(TaskContext);
  const queryClient = useQueryClient();

  const getTasks = useCallback((projectId: string) => {
    return useQuery({
      queryKey: ["tasks", projectId], // Include projectId to differentiate between projects
      queryFn: async () => {
        const tasks = await TaskHttpGateway.get({ projectId });
        return tasks;
      },
    });
  }, []);
  function addTask(projectId: string, statusId: string) {
    const newTask: Omit<Task, "Status"> = {
      id: generateUUID(),
      title: "Nova Tarefa",
      text: "",
      statusId,
      isNew: true,
      projectId: projectId,
    };
    createTaskMutation.mutate(newTask);
  }

  const createTaskMutation = useMutation({
    mutationFn: async (
      task: Pick<Task, "text" | "title" | "endDate" | "statusId" | "projectId">
    ) => {
      const taskCreated = await TaskHttpGateway.create({ ...task });
      return taskCreated;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      }); // Invalidate the tasks query
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (task: ITaskHttpGateway.UpdateRequest) => {
      await TaskHttpGateway.update({ ...task });
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      }); // Invalidate the tasks query
    },
  });

  const updatePositionsTaskMutation = useMutation({
    mutationFn: async (data: ITaskHttpGateway.UpdateTaskPositionRequest) => {
      await TaskHttpGateway.updateTaskPositions(data);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      }); // Invalidate the tasks query
    },
  });

  const getDetailTask = (task: Pick<Task, "id">) => {
    return useQuery({
      queryKey: ["detail-task", task.id], // Include taskId to differentiate between tasks
      queryFn: async () => {
        const taskDetail = await TaskHttpGateway.getDetail({ ...task });
        return taskDetail;
      },
    });
  };
  const deleteTaskMutation = useMutation({
    mutationFn: async (task: Pick<Task, "id" | "projectId">) => {
      await TaskHttpGateway.delete({ ...task });
    },
    onSuccess: (data, variables, context) => {
      console.log("Task deleted successfully", ["tasks", variables.projectId]);
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      }); // Invalidate the tasks query
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });

  function deleteTask(taskId: string, projectId: string) {
    deleteTaskMutation.mutate({ id: taskId, projectId });
  }
  function showOpenTaskModal(task: Task) {
    taskContext.onOpen(task);
  }

  return {
    showOpenTaskModal,
    createTask: createTaskMutation.mutate,
    addTask,
    updateTask: updateTaskMutation.mutate,
    getTasks,
    getDetailTask,
    deleteTask,
    updateTaskPosition: updatePositionsTaskMutation.mutate,
  };
}
