# #Stage 1 : BUILDER (construction)
FROM node:20-alpine AS builder
WORKDIR /builder
COPY package*.json ./
RUN npm ci                    
COPY . .
# Ici possibilité de : builder, tester, compiler...
# Résultat : image grosse avec tout code et dépendance inutile en production

# Stage 2 : PRODUCTION 
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Installation des dépendances strictement necessaire à la production
RUN npm ci --omit=dev  
COPY --from=builder /builder/math.js ./ 
COPY --from=builder /builder/index.js ./ 
CMD ["node", "index.js"]


