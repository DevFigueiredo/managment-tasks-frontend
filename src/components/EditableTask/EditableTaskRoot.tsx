import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

export const EditableTaskRoot: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Flex
      alignItems="center"
      position="relative"
      bg={"white"}
      padding={2}
      // borderTop="1px solid rgba(0, 0, 0, 0.3)"
      borderBottom="1px solid rgba(0, 0, 0, 0.3)"
    >
      {children}
    </Flex>
  );
};
