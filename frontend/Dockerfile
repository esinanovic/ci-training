# frontend/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build l'app React
RUN npm run build

# Installe serve pour servir les fichiers statiques
RUN npm install -g serve

# Expose le port
EXPOSE 3000

# Lance le serveur
CMD ["serve", "-s", "build", "-l", "3000"]