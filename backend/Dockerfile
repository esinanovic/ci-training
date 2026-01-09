# BACKEND - Pour une API Node.js
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci                    
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev  
COPY --from=builder /app/*.js ./
EXPOSE 3001
CMD ["node", "index.js"]