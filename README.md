# アプリケーション名

かんたん家計簿

# アプリケーション概要

日々の支出や収入を入力し、グラフやカレンダーなどで家計の状況を把握できる家計簿です。

<img src="https://user-images.githubusercontent.com/65108885/149640735-39b66a7d-372d-4ed2-88e8-8ea94c25e2d0.png" width="400px"><img src="https://user-images.githubusercontent.com/65108885/149640811-35eca66c-cdd4-4467-8aa9-00ce5243851b.png" width="400px">

![アニメ２](https://user-images.githubusercontent.com/65108885/149703905-4e203979-3f14-4c32-831c-2706be183552.gif)

# アプリ作成理由と解決するための工夫点

## 理由  
- 過去に自分が使っていた家計簿アプリにあまり利便性を感じなかった
- 継続的に使いたくなるような家計簿アプリを開発して、自分で使用したかった

## 工夫点
- トップページからでも収支を入力できるようにして煩わしさを軽減させた
- 使う金額をいくらまでに抑えたいか記入する欄（目標欄）を作ることで、モチベーションを保ちやすくした
- グラフやカレンダーを導入し、データを可視化して見やすくした

# アプリURL

https://next-firebase-expenses.vercel.app/

# テスト用アカウント

email: test@test.com  
パスワード: testuser  
※トップページの「登録せずに使ってみる」からもログインできます。  
  
# 機能一覧

## ユーザー機能（Firebase Auth使用）

- ユーザー登録
- ユーザーログイン
- ゲストログイン
- 認証、認可（Firebase セキュリティルールを設定）

## 支出、収入投稿機能

- 投稿機能
  - 日付、金額、カテゴリーなど入力データ投稿（Firebase Firestoreに保存）
  - 画像投稿（Firebase Storageに別で保存）

- 投稿一覧を表示する機能
  - 表示件数を指定できる
  - 日付、カテゴリーで並び替えできる（ドロップダウンリスト）
  - ページネーション

- カレンダーに投稿を表示する機能
  - 指定した月の投稿を日付ごとに全表示
  - 日付クリックでその日の投稿詳細データ表示
  - 日付を指定した状態で新規作成へリンク可

- 更新、削除機能

## 目標設定機能

- 投稿機能
  - 月ごとに使う金額の上限（それ以下に抑えたい金額）を設定（Firebase Firestoreに保存）

- 表示機能
  - 現在の支出状況と比較し、カテゴリーごとに差分金額を表示
  
- 更新、削除機能

## グラフ

- 円グラフ
  - カテゴリーごとの支出、収入合計金額を表示

- 棒グラフ
  - 月ごとの支出、収入、収支を年間で表示 

# 使用技術

- HTML/CSS
- TypeScript 4.4.4
- Next.js 12.0.1
- Firebase 9.5.0
