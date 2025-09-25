# Honoのバックエンドの自己流テンプレート

## 概要
Hono+Zod+OpenAPI(drizzle,Auth.js)の開発をするなかでこの構築の自分の中の完成にたどり着いたのでそのメモ

## ディレクトリ構造
src
├── config // 設定ファイル
├── db // dbとりまとめ
│   ├── index.ts
│   └── schema.ts
├── features
│   └── articles
│       ├── routes.ts // openapi.tsとhandlers.tsをとりまとめた薄いルーター
│       ├── handlers.ts // service.tsから@hono/zod-openapiのためのハンドラ設計
│       ├── openapi.ts // schema.tsから@hono/zod-openapiのためのルート設定
│       ├── service.ts // アプリケーションサービス、ユースケースとDTO
│       ├── repository.ts // ドメインリポジトリ、DB操作
│       ├── schema.ts // Req, Resのスキーマ定義、OpenAPIの軽い例
│       └── types.ts // drizzleスキーマから型生成したりとか
├── index.ts
├── lib
│   ├── auth // Auth.jsの設定とヘルパー関数とりまとめ
│   ├── http // レスポンスユーティリティとりまとめ
│   ├── openapi 
│   │   ├── index.ts // OpenAPIのせっていとりまとめ
│   │   └── tags.ts
│   └── types.ts
└── middleware
    ├── auth.ts // 認証Middleware
    └── db.ts // HonoのContextにdb注入するようmiddleware
