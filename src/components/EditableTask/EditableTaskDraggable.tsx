import { Box, ListIcon } from "@chakra-ui/react";
import { MdDragHandle } from "react-icons/md";

export const EditableTaskDraggable: React.FC = () => (
  <Box cursor="grab" padding={2}>
    <ListIcon as={MdDragHandle} color="gray.500" />
  </Box>
);
