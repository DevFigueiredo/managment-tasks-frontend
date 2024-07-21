import {
  Flex,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  text: string;
  onClick?: () => void;
  disabledControls?: boolean;
  textSize?:
    | "large"
    | "medium"
    | "small"
    | "x-large"
    | "x-small"
    | "xx-large"
    | "xx-small"
    | "xxx-large";
  isEditMode?: boolean;
}

export const EditableTaskItem: React.FC<Props> = ({
  text,
  onClick,
  disabledControls = false,
  textSize,
  isEditMode,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Flex
      justifyContent="center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      padding={2}
      height={"100%"}
      width={"100%"}
      position="relative"
    >
      <Editable
        defaultValue={text}
        onClick={onClick}
        flex="1"
        cursor={"pointer"}
        startWithEditView={isEditMode}
      >
        <EditablePreview
          fontSize={textSize}
          cursor="pointer"
          _hover={{ color: "blueviolet" }}
        />
        <EditableInput />
        {!disabledControls && <EditableControls isHovering={isHovering} />}
      </Editable>
    </Flex>
  );
};

const EditableControls: React.FC<{ isHovering: boolean }> = ({
  isHovering,
}) => {
  const { isEditing, getEditButtonProps } = useEditableControls();

  return isHovering && !isEditing ? (
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
