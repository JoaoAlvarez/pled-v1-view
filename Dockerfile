# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache --virtual .build-deps python3 make g++ \
    && npm ci \
    && apk del .build-deps

COPY . .

ARG BUILD_CONFIGURATION=production
RUN npm run build -- --configuration=${BUILD_CONFIGURATION}

# Runtime stage without Nginx
FROM node:18-alpine AS runtime

WORKDIR /srv/app

ENV PORT=4200

RUN npm install -g http-server

COPY --from=build /app/dist/ngx-admin-demo ./

EXPOSE ${PORT}

CMD ["http-server", ".", "-p", "${PORT}", "-c-1", "--gzip"]
