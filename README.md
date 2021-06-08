# TownID Japan (まちID)

## TownID取得 (get TownID)

```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const townid = TownID.find("福井県", "鯖江市", "新横江一丁目");
console.log(townid);
```

## 都道府県一覧取得 (get prefectures)

```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const prefs = TownID.getPrefs();
console.log(prefs);
```

## 市区町村一覧取得 (get cities)

```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const cities = TownID.getCities("福井県");
console.log(cities);
```

## 町一覧取得 (get towns)

```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const towns = TownID.getTowns("福井県", "鯖江市");
console.log(towns);
```

