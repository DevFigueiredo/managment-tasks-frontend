"use client";
import { Box } from "@chakra-ui/react";
import ProjectList from "@/components/ProjectList";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import { getStatus, statusList } from "@/utils/status";
export default function Home() {
  return (
    <Box>
      <ProjectList
        tasks={[
          {
            id: "122",
            status: getStatus("Concluída"),
            text: "eee, quia temporibus eveniet a libero incidunt suscipit",
          },
          {
            id: "222",
            status: getStatus("Em Progresso"),
            text: "Assumenda, quia temporibus eveniet a libero incidunt suscipit",
          },
          {
            id: "322",
            status: getStatus("Não Iniciada"),
            text: "Quidem, ipsam illum quis sed voluptatum quae eum fugit earum",
          },
          {
            id: "422",
            status: getStatus("Em Progresso"),
            text: "Quidem, ipsam illum quis sed voluptatum quae eum fugit earum",
          },
        ]}
      />
    </Box>
  );
}
