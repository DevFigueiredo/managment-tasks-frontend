import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale"; // Importa a localidade pt-BR para o date-fns
import { format } from "date-fns";
import { useController, Control, RegisterOptions } from "react-hook-form";
import { useState } from "react";

interface Props {
  control: Control<any>; // Passa o controle do react-hook-form
  name: string; // Nome do campo no formulário
  placeholder?: string; // Placeholder opcional
  isDue?: boolean; // Indica se a data está dentro ou fora do prazo
  rules?: RegisterOptions; // Regras de validação
}

export const ControlledDate: React.FC<Props> = ({
  control,
  name,
  placeholder = "Selecione uma data",
  isDue = false,
  rules,
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules, // Passa as regras de validação para useController
    defaultValue: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false); // Controle para mostrar o DatePicker

  const dateColor = isDue ? "blue.500" : "red.500"; // Define a cor com base na propriedade isDue

  return (
    <Box position="relative">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CalendarIcon color="gray.500" />
        </InputLeftElement>
        <Input
          value={
            value
              ? format(new Date(value), "dd MMM yyyy", { locale: ptBR })
              : ""
          }
          onClick={() => setShowDatePicker(true)} // Mostra o DatePicker ao clicar
          onChange={(e) => onChange(e.target.value)} // Atualiza o valor do campo
          readOnly // Mantém o campo não editável diretamente
          placeholder={placeholder}
          variant="outline"
          color={dateColor}
          ref={ref}
          borderColor={dateColor} // Define a cor da borda
          _focus={{ borderColor: dateColor }} // Define a cor da borda ao focar
        />
      </InputGroup>
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
        >
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date) => {
              onChange(date); // Atualiza o valor do campo
              setShowDatePicker(false); // Fecha o DatePicker após selecionar a data
            }}
            onBlur={onBlur}
            dateFormat="dd MMM yyyy"
            placeholderText={placeholder}
            onClickOutside={() => setShowDatePicker(false)} // Fecha o DatePicker ao clicar fora
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
