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
COPY --from=builder /app/index.js /app/math.js ./

RUN chown -R nodejs:nodejs /app

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1) })"

USER nodejs
EXPOSE 3001
CMD ["node", "index.js"]