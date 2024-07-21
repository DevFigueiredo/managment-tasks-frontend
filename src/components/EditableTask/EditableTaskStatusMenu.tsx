"use client";
import React, { ElementType } from "react";
import {
  ListIcon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IStatus, statusList } from "@/utils/status";

export const EditableTaskStatusMenu: React.FC<{
  onChange: (status: IStatus) => void;
  status: IStatus;
}> = ({ onChange, status }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<ListIcon as={status.icon} color={status.color} boxSize="20px" />}
        variant="ghost"
      />
      <MenuList>
        {statusList.map((item: IStatus) => {
          return (
            <MenuItem key={item.description} onClick={() => onChange(item)}>
              <ListIcon as={item.icon} color={item.color} boxSize="20px" />
              {item.description}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
