"use client";
import { ReactElement, useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { reorder } from "@/utils/reorder";
import { List } from "@chakra-ui/react";
import EditableTask from "../EditableTask";
import { IStatus } from "@/utils/status";
interface Task {
  id: string;
  status: IStatus;
  text: string;
}
interface Props {
  tasks: Task[];
}
export default function ProjectList(props: Props): ReactElement {
  const [tasks, setTasks] = useState<Task[]>(props.tasks);
  function onDragEnd(result: DropResult): void {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);
    console.log(items);
    setTasks(items);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks" type="TASK" direction="vertical">
        {(provided1) => (
          <article ref={provided1.innerRef} {...provided1.droppableProps}>
            <List spacing={0}>
              {tasks.map(({ id, text, status }, index) => {
                console.log(id);
                const onChangeStatus = (status: IStatus) => {
                  setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                      task.id === id ? { ...task, status: status } : task
                    )
                  );
                };
                return (
                  <Draggable key={index} draggableId={id} index={index}>
                    {(provided) => (
                      <article
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <EditableTask.Root>
                          <EditableTask.Draggable />
                          <EditableTask.Status
                            status={status}
                            onChange={onChangeStatus}
                          />
                          <EditableTask.Item text={text} />
                        </EditableTask.Root>
                      </article>
                    )}
                  </Draggable>
                );
              })}
              {provided1.placeholder}
            </List>
          </article>
        )}
      </Droppable>
    </DragDropContext>
  );
}
