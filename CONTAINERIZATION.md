# Containerization Strategy

## Overview
This document outlines the containerization strategy for the Calculator MCP server application.

## Docker Configuration

### Base Image
We use `node:20-slim` as our base image to minimize container size while providing all necessary Node.js functionality.

### Dockerfile Structure
```dockerfile
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source files
COPY tsconfig.json .
COPY src/ src/

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only the dependencies needed for production
RUN npm install --omit=dev \
    && npm install typescript@5.3.3

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Create a non-root user
RUN useradd -r -u 1001 -g root appuser \
    && chown -R appuser:root /app
USER appuser

# Expose the port the app runs on
ENV PORT=3000
EXPOSE $PORT

# Start the application
CMD ["node", "dist/index.js"]
```

## Environment Variables
The following environment variables should be configurable:
- `JWT_SECRET`: Secret key for JWT authentication (default: "changeme")
- `PORT`: Server port (default: 3000)

## Build and Run Instructions

### Local Development
1. Build the image:
   ```bash
   docker build -t calculator-mcp .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -e JWT_SECRET=your_secret calculator-mcp
   ```

### Publishing to Docker Hub

1. Tag the image with your Docker Hub username:
   ```bash
   docker tag calculator-mcp <your-dockerhub-username>/calculator-mcp:latest
   ```

2. Log in to Docker Hub:
   ```bash
   docker login
   ```

3. Push the image:
   ```bash
   docker push <your-dockerhub-username>/calculator-mcp:latest
   ```

### Running on EC2

1. SSH into your EC2 instance:
   ```bash
   ssh -i your-key.pem ec2-user@your-ec2-ip
   ```

2. Install Docker if not already installed:
   ```bash
   sudo yum update -y
   sudo yum install docker -y
   sudo service docker start
   sudo usermod -a -G docker ec2-user
   ```

3. Pull and run the container:
   ```bash
   docker pull <your-dockerhub-username>/calculator-mcp:latest
   docker run -d -p 3000:3000 \
     -e JWT_SECRET=your_secure_secret \
     <your-dockerhub-username>/calculator-mcp:latest
   ```

## Security Considerations
1. Use environment variables for sensitive data (JWT secret)
2. Run container as non-root user (implemented)
3. Use multi-stage builds to minimize final image size (implemented)
4. Regularly update base image for security patches

## Production Recommendations
1. Implement health checks
2. Set up proper logging
3. Consider using Docker Compose for easier deployment
4. Implement proper secret management
5. Use container orchestration (e.g., Kubernetes) for scaling

## EC2 Security Group Configuration
Ensure your EC2 security group allows:
- Inbound TCP port 3000 for the MCP server
- SSH access (port 22) for management
