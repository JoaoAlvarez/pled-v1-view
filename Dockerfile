FROM nginx:1.17.1-alpine
VOLUME /var/cache/nginx
COPY app/dist/requests-http /usr/share/nginx/html
COPY .config/nginx.conf /etc/nginx/nginx.conf
