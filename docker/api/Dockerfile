FROM node:21.5.0-bullseye-slim

ENV NODE_PATH /usr/local/lib/node_modules

WORKDIR /api

COPY ../../api/package*.json .

RUN npm install -g nodemon

RUN npm i