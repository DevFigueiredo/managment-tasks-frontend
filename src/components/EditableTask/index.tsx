"use client";

import { EditableTaskDraggable } from "./EditableTaskDraggable";
import { EditableTaskItem } from "./EditableTaskItem";
import { EditableTaskRoot } from "./EditableTaskRoot";
import { EditableTaskStatusMenu } from "./EditableTaskStatusMenu";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Root: EditableTaskRoot,
  Draggable: EditableTaskDraggable,
  Item: EditableTaskItem,
  Status: EditableTaskStatusMenu,
};
