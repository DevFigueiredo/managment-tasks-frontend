import {
  Box,
  Flex,
  FlexProps,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
interface Props extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  isActive?: boolean; // Adicione esta prop
  href?: string;
}

export const NavItem: React.FC<Props> = ({
  icon,
  children,
  isActive = false, // Define o valor padrão como false
  href,
  ...rest
}) => {
  return (
    <Link href={href || "#"}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={
          isActive ? useColorModeValue("cyan.400", "cyan.600") : "transparent"
        } // Muda a cor de fundo se ativo
        color={isActive ? "white" : useColorModeValue("gray.600", "gray.400")} // Muda a cor do texto se ativo
        _hover={{
          bg: useColorModeValue("gray.100", "gray.600"),
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={
              isActive ? "white" : useColorModeValue("gray.600", "gray.400")
            } // Muda a cor do ícone se ativo
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
