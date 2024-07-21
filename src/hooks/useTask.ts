import { Task } from "@/@core/domain/task";
import { TaskContext, useCreateTask } from "@/contexts/TaskContext";
import { useContext } from "react";

export function useTask() {
  const taskContext = useContext(TaskContext);

  function getTasks() {}
  function showOpenTaskModal(task: Task) {
    taskContext.onOpen(task);
  }
  function createTask() {}

  return { getTasks, showOpenTaskModal, createTask };
}
