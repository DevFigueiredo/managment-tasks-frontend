# Projeto de Gerenciamento de Atividades

Este projeto é uma aplicação de gerenciamento de atividades, construída com [Next.js](https://nextjs.org/) e [Chakra UI](https://chakra-ui.com/). O objetivo é fornecer uma interface moderna e responsiva para gerenciar projetos e tarefas.

## Tecnologias Utilizadas

- **Frontend:** Next.js
- **Docker:** Sim
- **CI/CD:** GitHub Actions

## Estrutura do Projeto

### Frontend

- **URL de Publicação:** [Frontend](https://managment-tasks-frontend-latest.onrender.com)
- **Docker Hub:** [danielfigueiredo/managment-tasks-frontend](https://hub.docker.com/repository/docker/danielfigueiredo/managment-tasks-frontend/general)
- **Repositório GitHub:** [DevFigueiredo/managment-tasks-frontend](https://github.com/DevFigueiredo/managment-tasks-frontend)

### Backend

- **URL da API:** [Backend](https://managment-tasks-backend-latest.onrender.com)
- **Documentação Swagger:** [Swagger](https://managment-tasks-backend-latest.onrender.com/docs)
- **Repositório GitHub:** [DevFigueiredo/managment-tasks-backend](https://github.com/DevFigueiredo/managment-tasks-backend)

## Configuração do Ambiente

1. **Crie um arquivo `.env` na raiz do projeto e adicione a variável de ambiente:**

   ```bash
   NEXT_PUBLIC_API_URL=URL_DO_BACKEND
   ```

## Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

## Executar o Aplicativo

### Local

Para iniciar o aplicativo em modo de desenvolvimento, execute:

```bash
npm run start
```

Para iniciar o aplicativo em modo de observação, execute:

```bash
npm run start:dev
```

Para iniciar o aplicativo em modo de produção, execute:

```bash
npm run start:prod
```

### Com Docker

1. **Crie a Imagem Docker:**

   No diretório raiz do seu projeto, execute o seguinte comando:

   ```bash
   docker-compose build
   ```

2. **Execute o Contêiner:**

   Após a construção da imagem, inicie o contêiner com:

   ```bash
   docker-compose up
   ```

   O Next.js estará disponível na porta `3000` do seu localhost. Acesse [http://localhost:3000](http://localhost:3000) para ver seu projeto em execução.

## Desenvolvimento

## Comandos Úteis

- **Parar e Remover Contêineres**

  Para parar e remover contêineres em execução:

  ```bash
  docker-compose down
  ```

- **Remover Imagens e Volumes**

  Para remover todas as imagens e volumes não utilizados:

  ```bash
  docker system prune -a --volumes
  ```

## Suporte

Este projeto é de código aberto e licenciado sob a Licença MIT. Para mais informações sobre como apoiar ou contribuir, consulte [Apoio e Contribuição](https://docs.nestjs.com/support).

## Contato

- **Autor:** [Daniel Figueiredo](mailto:devfigueiredo@gmail.com)

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
