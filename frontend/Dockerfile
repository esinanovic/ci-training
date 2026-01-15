# # frontend/Dockerfile
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci
# COPY . .

# # Variable pour railway
# ARG REACT_APP_API_URL
# ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# RUN npm run build

# # Stage 2 : Production
# FROM nginx:alpine

# # RUN addgroup -g 1001 -S nginxuser && \
# #     adduser -S nginxuser -u 1001 -G nginxuser

# COPY --from=builder /app/build /usr/share/nginx/html

# #USER nginxuser
# CMD ["nginx", "-g", "daemon off;"]

#test

FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

FROM nginx:alpine

# Installe gettext pour envsubst
RUN apk add --no-cache gettext

# Copie les fichiers React
COPY --from=builder /app/build /usr/share/nginx/html

# Crée le template de config Nginx avec variable PORT
RUN echo 'server {\
  listen ${PORT};\
  server_name _;\
  root /usr/share/nginx/html;\
  index index.html;\
  \
  location / {\
    try_files $uri $uri/ /index.html;\
  }\
}' > /etc/nginx/conf.d/default.conf.template

# Script d'entrée qui remplace ${PORT}
RUN echo '#!/bin/sh\n\
# Remplace ${PORT} par la vraie valeur\n\
envsubst "\$PORT" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf\n\
echo "🚀 Nginx configuré sur le port: \$PORT"\n\
# Démarre Nginx\n\
exec nginx -g "daemon off;"' > /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]