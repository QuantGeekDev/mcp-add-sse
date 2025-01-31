# Build stage
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
    && npm install typescript@5.3.3 # Needed for running the built JS files

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
