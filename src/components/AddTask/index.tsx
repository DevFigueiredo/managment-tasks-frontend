import { Box, Text, useColorModeValue } from "@chakra-ui/react";

interface AddTaskProps {
  onClick: () => void; // Função a ser chamada quando o texto for clicado
}

const AddTask = ({ onClick }: AddTaskProps) => {
  return (
    <Box
      p={3}
      mb={2}
      borderRadius="md"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
      textAlign="center"
      cursor="pointer"
      _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
      onClick={onClick}
    >
      <Text
        fontSize="md"
        fontWeight="bold"
        color={useColorModeValue("teal.500", "teal.300")}
      >
        Adicionar Tarefa
      </Text>
    </Box>
  );
};

export default AddTask;
