# Stage-0
FROM node:stretch

WORKDIR /usr/src/app

RUN git clone https://github.com/doc-sys/react_client.git .
RUN npm install
RUN npm run build


# Stage-final
FROM nginx:latest

WORKDIR /var/www/html

COPY --from=0 /usr/src/app/docker-nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /usr/src/app/build .