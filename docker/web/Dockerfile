FROM node:20-slim

WORKDIR /web

# package.jsonとpackage-lock.jsonをコピー
COPY web/package*.json ./

# 依存関係をインストールし、node_modulesをボリュームとして保持
RUN npm install

# 開発用ポートを公開
EXPOSE 5173

# 開発サーバーのみを起動
CMD ["npm", "run", "dev"]
