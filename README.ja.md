# 日本まちID (TownID Japan)

約19万の日本のまちにユニークなIDを割り当てたプロジェクトです。TownIDは[Geo3x3](https://geo3x3.com/)の形式になっているので大まかな位置情報もわかります。

## デモ

https://code4fukui.github.io/TownID/

## 機能

- 都道府県、市区町村、町単位でTownIDを取得できる
- 都道府県一覧、市区町村一覧、町一覧を取得できる

## 使い方

```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const townid = await TownID.find("福井県", "鯖江市", "新横江一丁目");
console.log(townid); // E9138732346
```

## データ・API

データソースは[国土交通省 位置参照情報 ダウンロードサービス](https://nlftp.mlit.go.jp/cgi-bin/isj/dls/_choose_method.cgi)です。

## ライセンス

MIT License