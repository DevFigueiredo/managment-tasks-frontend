import {
  Flex,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useForm, useController } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  name: string;
  control: any;
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
  onEditEnd?: (text: string) => void;
}

export const EditableTaskItem: React.FC<Props> = ({
  name,
  control,
  text,
  onClick,
  disabledControls = false,
  textSize,
  isEditMode,
  onEditEnd,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: text,
  });

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
        value={field.value}
        flex="1"
        cursor={"pointer"}
        startWithEditView={isEditMode}
        onChange={(val) => {
          return field.onChange(val);
        }}
        onBlur={() => {
          if (onEditEnd) onEditEnd(field.value);
        }}
      >
        <Input
          disabledControls={disabledControls}
          textSize={textSize}
          isHovering={isHovering}
          onEdit={() => onEditEnd && onEditEnd(field.value)}
          onClick={onClick}
        />
      </Editable>
    </Flex>
  );
};

const Input: React.FC<
  Pick<Props, "disabledControls" | "textSize" | "onClick"> & {
    isHovering: boolean;
    onEdit: () => void;
  }
> = ({ disabledControls = false, textSize, isHovering, onEdit, onClick }) => {
  return (
    <>
      <EditablePreview
        fontSize={textSize}
        cursor="pointer"
        onClick={onClick}
        _hover={{ color: "blueviolet" }}
      />
      <EditableInput />
      {!disabledControls && <EditableControls isHovering={isHovering} />}
    </>
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
