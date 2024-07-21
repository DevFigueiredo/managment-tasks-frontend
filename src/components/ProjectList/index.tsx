"use client";
import { ReactElement, useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Box } from "@chakra-ui/react";
import EditableTask from "../EditableTask";
import { reorder } from "@/utils/reorder";
import { Task } from "@/@core/domain/task";
import { useCreateTask } from "@/contexts/useCreateTaskContext";

interface Props {
  tasks: Task[];
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

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks" type="TASK" direction="vertical">
          {(provided1) => (
            <article ref={provided1.innerRef} {...provided1.droppableProps}>
              {tasks.map((task, index) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <article
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <EditableTask.Root>
                          <EditableTask.Draggable />
                          <EditableTask.Status status={task.status} />
                          <EditableTask.Item
                            text={task.title}
                            onClick={() => createTask.onOpen(task)}
                          />
                        </EditableTask.Root>
                      </article>
                    )}
                  </Draggable>
                );
              })}
              {provided1.placeholder}
            </article>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
