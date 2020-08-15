# FROM node:latest as angular
# ENV NODE_ENV production
# WORKDIR /app
# COPY package.json /app
# RUN npm install --silent
# COPY . .
# RUN npm run build

# FROM nginx:latest as prod-stage
# VOLUME /var/cache/nginx
# COPY --from=angular app/dist/requests-http /usr/share/nginx/html
# COPY .config/nginx.conf /etc/nginx/conf.d/default.conf

##TEMP
FROM node:latest as angular

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app

RUN npm install --silent
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
