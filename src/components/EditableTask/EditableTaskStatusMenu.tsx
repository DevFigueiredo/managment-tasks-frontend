"use client";
import React, { ElementType, useEffect, useState } from "react";
import {
  List,
  ListIcon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useStatus } from "@/hooks/useStatus";
import { Status } from "@/@core/domain/entities/status";
import { FaRegDotCircle } from "react-icons/fa";

export const EditableTaskStatusMenu: React.FC<{
  status: Status;
}> = ({ status: statusTask }) => {
  const { getStatus } = useStatus();
  const { data: statusList } = getStatus();
  const [status, setStatus] = useState<Status>(statusTask);
  const onChangeStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  useEffect(() => {
    if (!statusTask && statusList?.length) {
      const defaultStatus = statusList?.find((v) => v.default);
      if (defaultStatus) {
        setStatus(defaultStatus);
      }
    }
  }, [statusList, statusTask]);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={
          <ListIcon as={FaRegDotCircle} color={status?.color} boxSize="20px" />
        }
        variant="ghost"
      />
      <MenuList>
        <List>
          {statusList?.map((item) => (
            <MenuItem
              key={item.description}
              onClick={() => onChangeStatus(item)}
            >
              <ListIcon as={FaRegDotCircle} color={item.color} boxSize="20px" />
              {item.description}
            </MenuItem>
          ))}
        </List>
      </MenuList>
    </Menu>
  );
};
