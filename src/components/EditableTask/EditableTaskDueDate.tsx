import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { CalendarIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale"; // Importa a localidade pt-BR para o date-fns
import { format } from "date-fns";

interface Props {
  dueDate?: Date;
  onDueDateChange?: (date: Date) => void;
  isDue: boolean; // Adiciona a propriedade isDue para determinar se a data está dentro ou fora do prazo
}

export const EditableTaskDueDate: React.FC<Props> = ({
  dueDate,
  onDueDateChange,
  isDue, // Recebe a propriedade isDue
}) => {
  const [newDueDate, setNewDueDate] = useState<Date | null>(dueDate || null);
  const [inputValue, setInputValue] = useState<string>(
    dueDate ? format(dueDate, "dd MMM yyyy", { locale: ptBR }) : ""
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setNewDueDate(date);
      setInputValue(format(date, "dd MMM yyyy", { locale: ptBR }));
      onDueDateChange && onDueDateChange(date);
    }
    setShowDatePicker(false);
  };

  const dateColor = isDue ? "blue.500" : "red.500"; // Define a cor com base na propriedade isDue

  return (
    <Box ml={4} position="relative">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CalendarIcon color="gray.500" />
        </InputLeftElement>
        <Input
          value={inputValue}
          onClick={() => setShowDatePicker(!showDatePicker)}
          readOnly
          placeholder="Data Prazo"
          variant="outline"
          color={dateColor} // Aplica a cor definida
        />
      </InputGroup>
      {showDatePicker && (
        <Box position="absolute" zIndex="popover" top="100%" left="0">
          <DatePicker
            selected={newDueDate}
            onChange={handleDateChange}
            dateFormat="dd MMM yyyy"
            placeholderText="Selecione uma data"
            onClickOutside={() => setShowDatePicker(false)}
            inline
            locale={ptBR} // Define a localidade para o DatePicker
          />
        </Box>
      )}
    </Box>
  );
};
