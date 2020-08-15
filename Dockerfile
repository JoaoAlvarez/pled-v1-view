FROM nginx:1.17.1-alpine
COPY .dist /usr/share/nginx/html
COPY .config/nginx.conf /etc/nginx/nginx.conf
