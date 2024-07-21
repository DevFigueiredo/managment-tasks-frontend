import React from "react";
import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Box bg="gray.100" p="4" boxShadow="sm">
      <Flex align="center">
        <Heading as="h1" size="md">
          Meu Dashboard
        </Heading>
        <Spacer />
        <Button colorScheme="teal">Adicionar Projeto</Button>
      </Flex>
    </Box>
  );
};

export default Header;
