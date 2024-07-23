import { Box, Flex, List, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  children: React.ReactNode;
  code?: string;
  startDate?: Date; // Data de início da tarefa
}

export const EditableTaskRoot: React.FC<Props> = ({
  children,
  code,
  startDate,
}) => {
  return (
    <List
      style={{ cursor: "default" }} // Evita o cursor de arrastar sobre o texto
    >
      {code && (
        <Box
          mb={2}
          fontSize="sm"
          color="gray.500"
          userSelect="text" // Permite a seleção do texto
          style={{ cursor: "default" }} // Evita o cursor de arrastar sobre o texto
        >
          Código da tarefa: {code}
        </Box>
      )}

      {startDate && (
        <Box mb={2} fontSize="sm" color="gray.500">
          Iniciada em:{" "}
          {format(new Date(startDate), "dd MMM yyyy", { locale: ptBR })}
        </Box>
      )}

      <Flex alignItems="center" position="relative" bg={"white"}>
        {/* Display Task ID */}
        {children}
      </Flex>
    </List>
  );
};
