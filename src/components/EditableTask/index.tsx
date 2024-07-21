"use client";

import { EditableTaskDeleteButton } from "./EditableTaskDeleteButton";
import { EditableTaskDraggable } from "./EditableTaskDraggable";
import { EditableTaskDueDate } from "./EditableTaskDueDate";
import { EditableTaskItem } from "./EditableTaskItem";
import { EditableTaskRoot } from "./EditableTaskRoot";
import { EditableTaskStatusMenu } from "./EditableTaskStatusMenu";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Root: EditableTaskRoot,
  Draggable: EditableTaskDraggable,
  Item: EditableTaskItem,
  DueDate: EditableTaskDueDate,
  DeleteButton: EditableTaskDeleteButton,
  Status: EditableTaskStatusMenu,
};
