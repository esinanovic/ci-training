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
FROM nginx:alpine

# Fichier HTML simple
RUN echo '<!DOCTYPE html>\
<html>\
<head><title>Railway Test</title></head>\
<body>\
<h1>✅ TEST SUCCESS!</h1>\
<p>Port Railway: <span id="port"></span></p>\
<script>\
document.getElementById("port").textContent = window.location.port || "80/443";\
</script>\
</body>\
</html>' > /usr/share/nginx/html/index.html

# Configuration qui accepte n'importe quel port
RUN echo 'server {\
  listen ${{PORT}};\
  server_name _;\
  root /usr/share/nginx/html;\
  index index.html;\
}' > /etc/nginx/conf.d/default.conf.template

CMD /bin/sh -c "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"