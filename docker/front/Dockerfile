FROM node:21.5.0-bullseye-slim

WORKDIR /front

# package.jsonとpackage-lock.jsonをコピーする
COPY ../../front/package*.json ./

# viteをインストールする
RUN npm install -g create-vite@5.1.0 vite

# 依存関係をインストールする
RUN npm install

COPY /front .
