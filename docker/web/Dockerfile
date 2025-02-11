# ビルドステージ
FROM node:22-slim AS builder

WORKDIR /web

# 依存関係のインストール
COPY web/package*.json ./
RUN npm install -g npm@latest && \
    npm ci --omit=dev

# ソースコードのコピー
COPY web/ .

# 開発ステージ
FROM node:22-slim AS prod

# 最新のnpmをインストール
RUN npm install -g npm@latest

# 本番環境用のセキュリティ設定
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser && \
    mkdir -p /web && \
    chown -R nodeuser:nodejs /web

WORKDIR /web

# package.jsonとpackage-lock.jsonをコピー
COPY web/package*.json ./

# ソースコードのコピー
COPY web/ .

# 本番環境では非rootユーザーを使用
USER nodeuser

# タイムゾーンの設定
ENV TZ=Asia/Tokyo

# 使用するポートの公開
EXPOSE ${VITE_APP_PORT}

CMD ["npm", "run", "dev"]
