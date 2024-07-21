"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  useDisclosure,
  Stack,
  Box,
  Text,
  UseDisclosureProps,
} from "@chakra-ui/react";
interface Props extends Required<Omit<UseDisclosureProps, "id">> {}
const CreateProjectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultIsOpen,
}) => {
  return (
    <>
      <Modal isOpen={isOpen || defaultIsOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar espaço</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="4">
              Um espaço representa equipes, departamentos ou grupos, cada um com
              suas próprias listas, fluxos de trabalho e configurações.
            </Text>
            <FormControl mb="4">
              <FormLabel>Ícone e nome</FormLabel>
              <Stack direction="row" align="center">
                <Box
                  w="10"
                  h="10"
                  bg="gray.200"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="lg" color="gray.500">
                    M
                  </Text>
                </Box>
                <Input placeholder="por exemplo, marketing, engenharia, RH" />
              </Stack>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Descrição (opcional)</FormLabel>
              <Textarea placeholder="Adicionar descrição" />
            </FormControl>
            <FormControl display="flex" alignItems="center" mb="4">
              <FormLabel mb="0">Tornar privado</FormLabel>
              <Switch ml="2" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr="3" onClick={onClose}>
              Usar modelos
            </Button>
            <Button colorScheme="purple" onClick={onClose}>
              Continuar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectModal;
