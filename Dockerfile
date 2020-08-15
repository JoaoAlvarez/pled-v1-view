FROM node:latest
ENV NODE_ENV prod
WORKDIR /app
# COPY package.json /app
# RUN npm install --silent
# COPY . .
# RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY dist /usr/share/nginx/html
COPY .config/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
