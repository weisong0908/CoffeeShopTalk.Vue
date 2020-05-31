FROM node:lts-alpine
RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --mode staging

EXPOSE 8080
ENTRYPOINT [ "http-server", "dist" ]