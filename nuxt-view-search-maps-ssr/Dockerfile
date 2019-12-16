# ノードイメージ取得。最新のNode10 LTS
FROM node:10
# ワークディレクトリ
WORKDIR /usr/src/app
# CloudRunで動作させるポート設定
ENV PORT 8080
ENV HOST 0.0.0.0
# アプリケーションの依存関係をインストールする
COPY package*.json ./
# npm モジュールをインストール
RUN npm install
# vue2-google-maps install
RUN npm install vue2-google-maps -g
# アプリケーションのソースをバンドルする
COPY . .
RUN npm run build

CMD ["npm", "start"]