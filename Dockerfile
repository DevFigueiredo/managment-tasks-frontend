# Use a imagem base do Node.js
FROM node:18 AS builder

# Diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Executa o build da aplicação Next.js
RUN npm run build

# Usando uma imagem base mais leve para o ambiente de produção
FROM node:18-slim

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos do build da etapa anterior
COPY --from=builder /app ./

# Instalando as dependências de produção
RUN npm install --omit=dev

# Expondo a porta que a aplicação Next.js usará
EXPOSE 3000

# Comando para iniciar a aplicação Next.js
CMD ["npm", "start"]
