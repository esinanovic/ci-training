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


# frontend/Dockerfile (version test)
FROM nginx:alpine

RUN echo '<h1>✅ Frontend Works! PORT=$PORT</h1>' > /usr/share/nginx/html/index.html

# Script qui utilise le PORT Railway
RUN echo '#!/bin/sh\n\
echo "Railway PORT: $PORT"\n\
sed -i "s/listen 80/listen $PORT/g" /etc/nginx/conf.d/default.conf\n\
exec nginx -g "daemon off;"' > /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]