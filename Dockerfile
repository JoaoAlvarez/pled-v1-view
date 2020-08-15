FROM nginx
COPY dist /usr/share/nginx/html
COPY default-nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
