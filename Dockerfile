# Use the base image for building the application
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lighter image for the production environment
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy built files and node_modules from the builder stage
COPY --from=builder /app ./

# Install production dependencies
RUN npm install

# Ensure the app has proper permissions
RUN chown -R node:node /app

# Switch to a non-root user for better security
USER node

# Expose the port the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
