# ビルドステージ
FROM node:22-slim AS builder

WORKDIR /api

# 依存関係のインストール
COPY package*.json ./
RUN npm install -g npm@latest && \
    npm ci --omit=dev

# ソースコードのコピー
COPY . .


# 本番ステージ
FROM node:22-slim AS prod

# 最新のnpmをインストール
RUN npm install -g npm@latest

# セキュリティのための非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser && \
    mkdir -p /api && \
    chown -R nodeuser:nodejs /api

WORKDIR /api

# builderステージから全てのファイルをコピー
COPY --from=builder /api/ ./

# 非rootユーザーに切り替え
USER nodeuser

# 環境変数の設定
ENV NODE_ENV=production
ENV NODE_PATH=/api/node_modules

# タイムゾーンの設定
ENV TZ=Asia/Tokyo

# 使用するポートの公開
EXPOSE 3000

CMD ["npm", "start"]