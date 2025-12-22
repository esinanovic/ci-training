# Image de base (OS + runtime)
FROM node:20-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier les dépendances en premier (cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le reste du code
COPY . .

# Commande lancée au démarrage du conteneur
CMD ["node", "index.js"]

