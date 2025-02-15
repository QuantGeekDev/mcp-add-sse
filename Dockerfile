# Build stage
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig.json .
COPY src/ src/

RUN npm run build



# Production stage
FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev \
    && npm install typescript@5.3.3 # Needed for running the built JS files

COPY --from=builder /app/dist ./dist

RUN useradd -r -u 1001 -g root appuser \
    && chown -R appuser:root /app
USER appuser

ENV PORT=3000
EXPOSE $PORT

CMD ["node", "dist/index.js"]
