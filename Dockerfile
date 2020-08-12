FROM node:latest as angular
ENV NODE_ENV production
WORKDIR /app
COPY package.json /app
RUN npm install --prod --silent && mv node_modules ../
COPY . .
RUN npm run build:prod

FROM nginx:alpine as prod-stage
VOLUME /var/cache/nginx
COPY --from=angular app/dist/requests-http /usr/share/nginx/html
COPY .config/nginx.conf /etc/nginx/conf.d/default.conf
