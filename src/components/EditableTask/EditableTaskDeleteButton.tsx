"use client";
import { Box, IconButton } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { MdDelete } from "react-icons/md";

interface Props {
  onClick?: () => void;
}

export const EditableTaskDeleteButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Box ml={4} position="relative">
      <IconButton
        icon={<MdDelete />}
        size="md"
        variant="ghost"
        colorScheme="red"
        aria-label="Delete"
        onClick={onClick}
      />
    </Box>
  );
};
