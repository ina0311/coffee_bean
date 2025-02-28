FROM node:22-slim AS builder

WORKDIR /web

# 最新のnpmをインストール
RUN npm install -g npm@latest

# package.jsonとpackage-lock.jsonをコピー
COPY web/package*.json ./

# 依存関係のインストール
RUN npm install

# 本番ステージ
FROM node:22-slim as prod

WORKDIR /web

# builderステージからnode_modulesをコピー
COPY --from=builder /web/node_modules /web/node_modules

# タイムゾーンの設定
ENV TZ=Asia/Tokyo

# 使用するポートの公開
EXPOSE 5173

CMD ["npm", "run", "dev"]
