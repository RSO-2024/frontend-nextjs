# ------------------------------------------------------
# Stage 1: Builder
# ------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# ------------------------------------------------------
# Stage 2: Runner
# ------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start"]