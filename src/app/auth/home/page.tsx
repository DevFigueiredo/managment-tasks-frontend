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
            title: "eee, quia temporibus eveniet a libero incidunt suscipit",
            text: "",
          },
          {
            id: "222",
            status: getStatus("Em Progresso"),
            title:
              "Assumenda, quia temporibus eveniet a libero incidunt suscipit",
            text: "",
          },
          {
            id: "322",
            status: getStatus("Não Iniciada"),
            title:
              "Quidem, ipsam illum quis sed voluptatum quae eum fugit earum",
            text: "",
          },
          {
            id: "422",
            status: getStatus("Em Progresso"),
            title:
              "Quidem, ipsam illum quis sed voluptatum quae eum fugit earum",
            text: "",
          },
        ]}
      />
    </Box>
  );
}
