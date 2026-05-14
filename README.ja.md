# TownID Japan


TownID Japanは、日本の約19万の町に対して一意のID「TownID」を計算したプロジェクトであり、このIDはGeo3x3位置エンコーディングシステムに基づいています。

## 特徴
- 日本の約19万の町に対する一意のID（TownID）
- TownIDはGeo3x3位置エンコーディングシステムに基づいており、おおよその位置を把握可能
- TownIDの長さは4桁から14桁
- データは[国土交通省 位置参照情報ダウンロードサービス](https://nlftp.mlit.go.jp/cgi-bin/isj/dls/_choose_method.cgi)から取得

## 使い方
```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const townid = await TownID.find("Fukui Prefecture", "Sabae City", "Shinhokkaido 1-chome");
console.log(townid); // E9138732346
```

## データ / API
本プロジェクトは、国土交通省 位置参照情報ダウンロードサービスのデータを使用しています。

## ライセンス
MIT License
