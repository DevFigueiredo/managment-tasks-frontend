"use client";
import { Box } from "@chakra-ui/react";
import ProjectList from "@/components/ProjectList";
import { getStatus } from "@/utils/status";
export default function Home() {
  return (
    <Box>
      <ProjectList
        projectDescription="teste"
        projectProgress={60}
        projectTitle="TItulo"
        tasks={[
          {
            id: "122",
            status: getStatus("Concluída"),
            title: "eee, quia temporibus eveniet a libero incidunt suscipit",
            text: "",
            deadline: "",
          },
          {
            id: "222",
            status: getStatus("Em Progresso"),
            title:
              "Assumenda, quia temporibus eveniet a libero incidunt suscipit",
            text: "",
            deadline: "",
          },
          {
            id: "322",
            status: getStatus("Não Iniciada"),
            title:
              "Quidem, ipsam illum quis sed voluptatum quae eum fugit earum",
            text: "",
            deadline: "",
          },
          {
            id: "422",
            status: getStatus("Em Progresso"),
            title:
              "Quidem, ipsam illum quis sed voluptatum quae eum fugit earum",
            text: "",
            deadline: "",
          },
        ]}
      />
    </Box>
  );
}
