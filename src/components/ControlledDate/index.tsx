"use client";
import {
  Box,
  Button,
  IconButton,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { useController, Control, RegisterOptions } from "react-hook-form";
import { useState } from "react";

interface Props {
  control: Control<any>;
  name: string;
  placeholder?: string;
  isDue?: boolean;
  rules?: RegisterOptions;
  onDateChange?: (date: Date | null) => void; // Função para lidar com a alteração da data
  defaultDate?: Date | null; // Valor padrão para a data
}

export const ControlledDate: React.FC<Props> = ({
  control,
  name,
  placeholder = "Selecione uma data",
  isDue = false,
  rules,
  onDateChange, // Recebe a função para lidar com a alteração da data
  defaultDate = null, // Valor padrão para a data
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultDate, // Define o valor padrão aqui
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  const dateColor = isDue ? theme.colors.blue[500] : theme.colors.red[500];

  const handleDateClick = () => setShowDatePicker(true);
  const handleCloseDatePicker = () => setShowDatePicker(false);

  return (
    <Box position="relative" width="fit-content">
      <Button
        onClick={handleDateClick}
        variant="outline"
        color={dateColor}
        borderColor={dateColor}
        borderRadius="md"
        padding="8px 16px"
        rightIcon={<CalendarIcon color={dateColor} />}
        _hover={{ bg: "gray.100" }}
        _focus={{ boxShadow: "outline" }}
        _active={{ bg: "gray.200" }}
      >
        {value
          ? format(new Date(value), "dd MMM yyyy", { locale: ptBR })
          : placeholder}
      </Button>
      {showDatePicker && (
        <Box
          position="absolute"
          zIndex="popover"
          top="100%"
          left="0"
          mt={1}
          bg="white"
          borderRadius="md"
          shadow="md"
          p={4}
        >
          <DatePicker
            selected={value ? new Date(value) : defaultDate} // Usa o valor padrão se não houver valor
            onChange={(date) => {
              onChange(date);
              if (onDateChange) onDateChange(date); // Chama a função onDateChange
              handleCloseDatePicker();
            }}
            onBlur={onBlur}
            dateFormat="dd MMM yyyy"
            placeholderText={placeholder}
            onClickOutside={handleCloseDatePicker}
            inline
            locale={ptBR}
          />
        </Box>
      )}
      {error && (
        <Box color="red.500" mt={2}>
          {error.message}
        </Box>
      )}
    </Box>
  );
};
