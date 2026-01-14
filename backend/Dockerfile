# BACKEND - Pour une API Node.js
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci                    
COPY . .

FROM node:20-alpine

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev  
COPY --from=builder /app/*.js ./

RUN chown -R nodejs:nodejs /app
USER nodejs
EXPOSE 3001
CMD ["node", "index.js"]