# TownID Japan (日本まちID)

- 日本のまち、約19万の日本のまちに、ユニークなID「TownID」を計算しました。
- TownIDは[Geo3x3](https://geo3x3.com/)になっているので大まかな場所も分かります。
- 桁数（[Geo3x3](https://geo3x3.com/)のレベル)は、4桁〜14桁です。
- データソースは、[国土交通省 位置参照情報 ダウンロードサービス](https://nlftp.mlit.go.jp/cgi-bin/isj/dls/_choose_method.cgi)です。

|区分|数|
|---|--|
|都道府県|47|
|市区町村|1,893|
|まち|190,016|

## TownID取得 (get TownID)

```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const townid = await TownID.find("福井県", "鯖江市", "新横江一丁目");
console.log(townid); // E9138732346
```

## 都道府県一覧取得 (get prefectures)

```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const prefs = await TownID.getPrefs();
console.log(prefs); // ["北海道", "青森県", ...
```

## 市区町村一覧取得 (get cities)

```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const cities = await TownID.getCities("福井県");
console.log(cities); // ["福井市", "敦賀市", "小浜市", ...
```

## 町一覧取得 (get towns)

```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const towns = await TownID.getTowns("福井県", "鯖江市");
console.log(towns); // ["旭町一丁目",  "旭町二丁目", ...
```
