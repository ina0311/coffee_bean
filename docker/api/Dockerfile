FROM node:22-slim AS builder

WORKDIR /api

# 最新のnpmをインストール
RUN npm install -g npm@latest

# package.jsonとpackage-lock.jsonをコピー
COPY api/package*.json ./

# 依存関係のインストール
RUN npm install

# 本番ステージ
FROM node:22-slim as prod

WORKDIR /api

# builderステージからnode_modulesをコピー
COPY --from=builder /api/node_modules /api/node_modules

# タイムゾーンの設定
ENV TZ=Asia/Tokyo

# 使用するポートの公開
EXPOSE 3000

CMD npm run dev