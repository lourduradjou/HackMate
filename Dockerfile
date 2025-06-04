# Stage 1: Build
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy source files
COPY . .

# Expose port
EXPOSE 5173


# Build the Vite app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]



