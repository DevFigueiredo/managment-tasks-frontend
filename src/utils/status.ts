import { MdCheckCircle, MdClose, MdSettings } from "react-icons/md";

// Definindo o tipo explícito para o statusList
interface StatusEntry {
  description: "Concluída" | "Em Progresso" | "Não Iniciada";
  color: string;
  icon: React.ComponentType;
}

export const statusList: StatusEntry[] = [
  {
    description: "Concluída",
    color: "green.500",
    icon: MdCheckCircle,
  },
  {
    description: "Em Progresso",
    color: "yellow.500",
    icon: MdSettings,
  },
  {
    description: "Não Iniciada",
    color: "red.500",
    icon: MdClose,
  },
];

export type StatusType = StatusEntry["description"];

export type IStatus = StatusEntry;

// Função para obter o ícone baseado no status
export const getStatus = (status: StatusType): IStatus => {
  const statusEntry = statusList.find(
    (s) => s.description === status
  ) as IStatus;
  if (!statusEntry) throw new Error("No status found");

  return statusEntry;
};
