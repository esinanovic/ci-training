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

FROM nginx:alpine

# HTML test
RUN echo '<h1>🎯 Railway Test Page</h1><p>Nginx is running!</p>' > /usr/share/nginx/html/index.html

# Script qui adapte automatiquement
CMD /bin/sh -c "
  # Utilise le PORT Railway, sinon 3000
  PORT=\${PORT:-3000}
  echo \"Starting Nginx on port: \$PORT\"
  
  # Remplace le port dans la config par défaut
  sed -i \"s/listen 80/listen \$PORT/\" /etc/nginx/conf.d/default.conf
  
  # Démarre Nginx
  nginx -g 'daemon off;'
"