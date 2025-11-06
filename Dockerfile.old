### Build stage ###
FROM node:18-alpine AS build

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm ci

COPY . .

ARG BUILD_CONFIGURATION=production
RUN npm run build -- --configuration=${BUILD_CONFIGURATION}

### Runtime stage ###
FROM nginx:1.25-alpine AS runtime

WORKDIR /usr/share/nginx/html

COPY config/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ngx-admin-demo ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
