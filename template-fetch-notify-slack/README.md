- Stack
  - [clasp](https://github.com/google/clasp)
  - [apps-script official top](https://developers.google.com/apps-script)
  - [apps-script reference](https://developers.google.com/apps-script/reference)
  - [url-fetch-app](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app)

## Login

```bash
$ clasp login
```

## Set Up

実行ディレクトリの名前でファイル作成される

```bash
$ npm run create
```

## Push

```bash
$ yarn push
```

## Deploy

版数を上げてデプロイする

```bash
$ yarn deploy
```

## Check Deploy Asset

```bash
$ clasp open
```

## Set Env

開いた GAS スクリプトから環境変数を設定する

[プロパティを登録する](https://qiita.com/massa-potato/items/2209ff367d65c5dd6181#%EF%BC%92%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%82%92%E7%99%BB%E9%8C%B2%E3%81%99%E3%82%8B)

## Publish As REST API

版数を上げてデプロイする
コマンドレベルのデプロイは版数上げているだけなので、公開作業は手動

## Confirm

IN

```bash
$ time node index.js | jq '' >dump.json

real    0m1.705s
user    0m0.562s
sys     0m0.089s
```

OUT

```bash
$ cat dump.json | jq '.message[0]'
{
  "winery": "Maselva",
  "wine": "Emporda 2012",
  "rating": {
    "average": "4.9",
    "reviews": "88 ratings"
  },
  "location": "Spain\n·\nEmpordà",
  "image": "https://images.vivino.com/thumbs/ApnIiXjcT5Kc33OHgNb9dA_375x500.jpg",
  "id": 1
}
```