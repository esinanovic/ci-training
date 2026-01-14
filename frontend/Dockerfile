# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 : Production
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm -rf /var/cache/nginx/*
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]