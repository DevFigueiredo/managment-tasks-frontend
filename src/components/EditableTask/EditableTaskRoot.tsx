import { Flex, List } from "@chakra-ui/react";
interface Props {
  children: React.ReactNode;
  disabledBorder?: boolean;
}
export const EditableTaskRoot: React.FC<Props> = ({
  children,
  disabledBorder,
}) => {
  return (
    <List>
      <Flex
        alignItems="center"
        position="relative"
        bg={"white"}
        borderBottom={!disabledBorder ? "1px solid rgba(0, 0, 0, 0.3)" : ""}
      >
        {children}
      </Flex>
    </List>
  );
};
