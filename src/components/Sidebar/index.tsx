"use client";

import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  IconButton,
  HStack,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { useCreateSpace } from "@/contexts/useCreateSpaceContext";
const projects = [
  {
    id: "1",
    name: "Project Alpha",
    description:
      "A project focused on developing new features for our main application.",
    dueDate: new Date("2024-08-15"),
  },
  {
    id: "2",
    name: "Project Beta",
    description:
      "An initiative to improve the user interface and user experience across our platform.",
    dueDate: new Date("2024-09-01"),
  },
  {
    id: "3",
    name: "Project Gamma",
    description:
      "A research project to explore new technologies and integrate them into our systems.",
    dueDate: new Date("2024-10-10"),
  },
  {
    id: "4",
    name: "Project Delta",
    description:
      "A project aimed at optimizing performance and scalability of our backend services.",
    dueDate: new Date("2024-11-20"),
  },
  {
    id: "5",
    name: "Project Epsilon",
    description:
      "A marketing campaign to increase user engagement and acquisition.",
    dueDate: new Date("2024-12-05"),
  },
  {
    id: "6",
    name: "Project Zeta",
    description:
      "An internal tool for better team collaboration and communication.",
    dueDate: new Date("2024-07-30"),
  },
];
interface LinkItemProps {
  name: string;
  icon: IconType;
  onClick?: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const createSpace = useCreateSpace();

  const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome },
    { name: "Trending", icon: FiTrendingUp },
    { name: "Explore", icon: FiCompass },
    { name: "Favourites", icon: FiStar },
    { name: "Settings", icon: FiSettings },
    { name: "Criar Projeto", icon: FiSettings, onClick: createSpace.onOpen },
  ];

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Artia
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <List spacing={3} p={4}>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            p={2}
            borderRadius="md"
            _hover={{ bg: "cyan.400", color: "white" }}
          >
            <ListIcon as={FiHome} color="cyan.400" />
            {project.name}
          </ListItem>
        ))}
      </List>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={link.onClick}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Artia
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
