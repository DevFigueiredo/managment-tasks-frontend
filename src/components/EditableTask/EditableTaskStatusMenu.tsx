"use client";
import React, { ElementType, useState } from "react";
import {
  List,
  ListIcon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IStatus, statusList } from "@/utils/status";

export const EditableTaskStatusMenu: React.FC<{
  status: IStatus;
}> = ({ status: statusTask }) => {
  const [status, setStatus] = useState<IStatus>(statusTask);
  const onChangeStatus = (newStatus: IStatus) => {
    setStatus(newStatus);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={
          <ListIcon as={status?.icon} color={status?.color} boxSize="20px" />
        }
        variant="ghost"
      />
      <MenuList>
        <List>
          {statusList?.map((item: IStatus) => (
            <MenuItem
              key={item.description}
              onClick={() => onChangeStatus(item)}
            >
              <ListIcon as={item.icon} color={item.color} boxSize="20px" />
              {item.description}
            </MenuItem>
          ))}
        </List>
      </MenuList>
    </Menu>
  );
};
