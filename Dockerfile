# Build stage
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache --virtual .build-deps python3 make g++ \
    && ln -sf python3 /usr/bin/python \
    && npm config set python python3 \
    && npm ci \
    && apk del .build-deps

COPY . .

ARG BUILD_CONFIGURATION=production
RUN npm run build -- --configuration=${BUILD_CONFIGURATION}

# Runtime stage with Express
FROM node:16-alpine AS runtime

WORKDIR /srv/app

ENV NODE_ENV=production \
    PORT=4200 \
    HOST=0.0.0.0

RUN npm init -y \
    && npm install express@4 \
    && rm package.json package-lock.json

COPY server.js .
COPY --from=build /app/dist/ngx-admin-demo ./dist

EXPOSE ${PORT}

CMD ["node", "server.js"]
