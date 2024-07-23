import {
  Box,
  Input,
  InputProps,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Control, useController, RegisterOptions } from "react-hook-form";

interface Props extends InputProps {
  control?: Control<any>; // Control prop to manage form state
  name: string; // Field name in the form
  rules?: RegisterOptions; // Validation rules
}

const ControlledInput: React.FC<Props> = ({
  control,
  name,
  rules,
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules, // Pass the rules to useController
    defaultValue: "", // Provide a default value if needed
  });

  return (
    <FormControl isInvalid={!!error}>
      <Input
        placeholder="Here is a sample placeholder"
        size="sm"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...rest}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default ControlledInput;
