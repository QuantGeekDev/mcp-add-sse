# Containerization Strategy

## Overview
This document outlines the containerization strategy for the Calculator MCP server application.

## Docker Configuration

### Base Image
We will use `node:20-slim` as our base image to minimize container size while providing all necessary Node.js functionality.

### Dockerfile Structure
```dockerfile
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port for SSE
EXPOSE 3000

# Set environment variable for JWT secret
ENV JWT_SECRET=changeme

# Start the server
CMD ["npm", "start"]
```

### .dockerignore
To optimize build context and prevent unnecessary files from being included:
```
node_modules
npm-debug.log
dist
.git
.gitignore
*.md
```

## Environment Variables
The following environment variables should be configurable:
- `JWT_SECRET`: Secret key for JWT authentication (default: "changeme")
- `PORT`: Server port (default: 3000)

## Build and Run Instructions
1. Build the image:
   ```bash
   docker build -t calculator-mcp .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -e JWT_SECRET=your_secret calculator-mcp
   ```

## Security Considerations
1. Use environment variables for sensitive data (JWT secret)
2. Run container as non-root user
3. Use multi-stage builds in production to minimize final image size
4. Regularly update base image for security patches

## Production Recommendations
1. Implement health checks
2. Set up proper logging
3. Consider using Docker Compose for easier deployment
4. Implement proper secret management
5. Use container orchestration (e.g., Kubernetes) for scaling

## Next Steps
1. Switch to Code mode to implement the Dockerfile and .dockerignore
2. Update the application code to use environment variables
3. Set up CI/CD pipeline for container builds
4. Implement monitoring and logging solutions
