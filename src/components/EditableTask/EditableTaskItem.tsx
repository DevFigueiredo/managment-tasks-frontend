import {
  Box,
  ButtonGroup,
  CheckboxIcon,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  ListIcon,
  MenuButton,
  useEditableControls,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

// Task.Item
export const EditableTaskItem: React.FC<{
  text: string;
}> = ({ text }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Flex
      justifyContent="center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Editable defaultValue={text} flex="1">
        <EditablePreview />
        <EditableInput />
        <EditableControls isHovering={isHovering} />
      </Editable>
    </Flex>
  );
};

const EditableControls: React.FC<{ isHovering: boolean }> = ({
  isHovering,
}) => {
  const { isEditing, getEditButtonProps } = useEditableControls();

  return isHovering ? (
    <IconButton
      icon={<MdEdit />}
      size="sm"
      top="0"
      right="0"
      variant="ghost"
      colorScheme="teal"
      aria-label="Edit"
      {...getEditButtonProps()}
    />
  ) : (
    <></>
  );
};
