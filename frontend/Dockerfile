# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 : Production
FROM nginx:alpine

RUN addgroup -g 1001 -S nginxuser && \
    adduser -S nginxuser -u 1001 -G nginxuser

COPY --from=builder /app/build /usr/share/nginx/html

USER nginxuser

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]