import { Box, Flex, List } from "@chakra-ui/react";
interface Props {
  children: React.ReactNode;
  code?: string;
}
export const EditableTaskRoot: React.FC<Props> = ({ children, code }) => {
  return (
    <List>
      {code ? (
        <Box mb={2} fontSize="sm" color="gray.500">
          Código da tarefa: {code}
        </Box>
      ) : (
        <></>
      )}

      <Flex alignItems="center" position="relative" bg={"white"}>
        {/* Display Task ID */}

        {children}
      </Flex>
    </List>
  );
};
