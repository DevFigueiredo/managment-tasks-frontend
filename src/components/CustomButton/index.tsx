"use client";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  onClick: () => void; // Função a ser chamada quando o texto for clicado
  disabled?: boolean; // Prop para desabilitar o botão
  children: ReactNode;
}

export const CustomButton: React.FC<Props> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <Box
      p={3}
      mb={2}
      borderRadius="md"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
      textAlign="center"
      cursor={disabled ? "not-allowed" : "pointer"}
      _hover={{
        bg: disabled
          ? useColorModeValue("white", "gray.800")
          : useColorModeValue("gray.50", "gray.700"),
      }}
      onClick={!disabled ? onClick : undefined} // Só chama onClick se não estiver desabilitado
    >
      <Text
        fontSize="md"
        fontWeight="bold"
        color={
          disabled
            ? useColorModeValue("gray.400", "gray.500")
            : useColorModeValue("teal.500", "teal.300")
        }
      >
        {children}
      </Text>
    </Box>
  );
};
