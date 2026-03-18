# === Stage 1: Build frontend ===
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json postcss.config.js tailwind.config.ts components.json ./
COPY src/ src/
RUN npm run build

# === Stage 2: Build server ===
FROM node:20-alpine AS server-build
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server/tsconfig.json ./
COPY server/src/ src/
RUN npm run build

# === Stage 3: API production image ===
FROM node:20-alpine AS api
WORKDIR /app

COPY --from=server-build /app/server/dist ./server/dist
COPY --from=server-build /app/server/node_modules ./server/node_modules
COPY --from=server-build /app/server/package.json ./server/package.json
COPY migrations/ ./migrations/

RUN mkdir -p uploads

ENV NODE_ENV=production
EXPOSE 3001

WORKDIR /app/server
CMD ["node", "dist/index.js"]

# === Stage 4: Nginx frontend ===
FROM nginx:alpine AS nginx
COPY --from=frontend-build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
