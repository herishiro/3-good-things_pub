



# 3 Good Things!
## 👉👉👉 　[3 Good Things!](https://www.3-good-things.app/)　👈👈👈

![3gt_main](https://user-images.githubusercontent.com/39423638/123388332-a354ee00-d5d3-11eb-97a2-4ea0fdb38264.jpg)

## このアプリについて
このアプリは毎晩寝る前に3つ、今日良かったことを思い出す新習慣で考え方をポジティブに変えちゃおうという'three good things'メソッドを手軽に実践するためのアプリです

Webアプリですが、PWA対応しているので、ホームスクリーン画面に追加することで上の画像のようにスマホアプリとしてお使いいただけます。

- [**使い方**](https://www.3-good-things.app/about)
- [**デモページ**](https://www.3-good-things.app/demo/input/2021/06/25)

### こだわりのUX

- 手元のボタンをクリックするだけで入力が完了！めんどくさいことなし！
- カテゴリやリストのサジェストで今日あったことが絶対思い出せる！

【カテゴリーから適当に気になるのを選んでみて】  

https://user-images.githubusercontent.com/39423638/123396306-20846100-d5dc-11eb-81ce-0d93a5c27a9e.MP4

【カテゴリー選択後の幸せリストから、似たような幸せがなかったか考えてみよう！】  

https://user-images.githubusercontent.com/39423638/123396267-14989f00-d5dc-11eb-8d23-6522533c713c.MP4




## Installation

動作確認環境：Windows 10 64bit / Node.js v12.2.0

1. レポジトリをクローン
```bash
git clone https://github.com/herishiro/3-good-things_pub.git
```
2. NPM パッケージをインストール
```bash
npm install
```
3. firebaseアカウントでプロジェクトを新規作成する
4. `.env.local`ファイルをrootフォルダに下記の内容で作成する
5. プロジェクトの設定に記載されたfirebaseConfigのパラメータを<>部分にリプレイスする
```.env.local
NEXT_PUBLIC_FIREBASE_API_KEY=<apiKey>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<authDomain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<projectId>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<storageBucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<messagingSenderId>
NEXT_PUBLIC_FIREBASE_APP_ID=<appId>
NEXT_PUBLIC_DOMAIN_URL=https://www.3-good-things.app
```
6.　ローカルサーバーを起動する
```bash
npm run dev
```

## Built With

- typescript 4.3.2
- React 17.0.1
- Next.js 10.2.0
- next-pwa 5.2.21
- material-ui 4.11.3
- @reduxjs/toolkit 1.5.1
- firebase authentication/ firestore
- jest 26.6.3
- playwright 1.11.0

hosted on Vercel

## 作成者

**たま**

- [Profile](https://github.com/herishiro)
- [twitter](https://twitter.com/herishiro)
- [Qiita](https://qiita.com/herishiro)
