import {
  Box,
  Text,
  Textarea,
  TextareaProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";

interface Props extends TextareaProps {
  control?: any; // Control prop to manage form state
  name: string; // Field name in the form
}

export const ControlledTextArea: React.FC<Props> = ({
  control,
  name,
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "", // Provide a default value if needed
  });

  return (
    <Box>
      <Textarea
        placeholder="Here is a sample placeholder"
        size="sm"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        isInvalid={!!error} // Display error state if there's an error
        {...rest}
      />
      {error && (
        <Text color="red.500" fontSize="sm">
          {error.message}
        </Text>
      )}
    </Box>
  );
};
