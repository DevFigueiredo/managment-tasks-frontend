import { Flex, List } from "@chakra-ui/react";
interface Props {
  children: React.ReactNode;
}
export const EditableTaskRoot: React.FC<Props> = ({ children }) => {
  return (
    <List>
      <Flex alignItems="center" position="relative" bg={"white"}>
        {children}
      </Flex>
    </List>
  );
};
