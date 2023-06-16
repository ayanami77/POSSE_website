# POSSE_website

![POSSE _ クイズ](https://github.com/Seiya-Tagami/POSSE_website/assets/107479598/bccb9cd6-ee3b-4d86-b251-fb2d9271cba2)

## 概要

大学一年生の頃に所属していたプログラミング学習コミュニティのウェブサイトを Vue3 + Express + TypeScript で再実装しました。

## 言語・環境

### フロントエンド

- Vue3 (Composition API)
- sass
- Tailwind CSS
- TypeScript
- vite

### バックエンド

- Express
- TypeScript
- mysql
- docker

## 設計

### フロントエンド

- SPA での構築
- Repository Pattern を試してみた  
  @ref https://zenn.dev/chida/articles/5756a54d94230a  
  @ref https://qiita.com/07JP27/items/0923cbe3b6435c19d761

### バックエンド

- 三層アーキテクチャ(models, controllers, services)による構築
- Rest での API 開発  
  @ref https://qiita.com/baby-degu/items/f1489dd94becd46ab523  
  @ref https://github.com/santiq/bulletproof-nodejs/tree/master

### プロジェクトの始め方

### web

```sh
$ cd web
```

パッケージのインストール

```sh
$ npm i
```

フロントエンドサーバーの起動

```sh
$ npm run dev
```

### service

```sh
$ cd service
```

パッケージのインストール

```sh
$ npm i
```

バックエンドサーバーの起動

- ターミナルを２つ開いて、それぞれコマンドを実行する

```sh
$ npm run watch
```

```sh
$ npm run dev
```

mysql の起動

```sh
$ docker compose up -d
```
