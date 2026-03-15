# TownID Japan

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

TownID Japan is a project that has calculated a unique ID "TownID" for approximately 190,000 towns in Japan, with the IDs being based on the Geo3x3 location encoding system.

## Features
- Unique IDs (TownID) for approximately 190,000 towns in Japan
- TownIDs are based on the Geo3x3 location encoding system, providing a rough idea of the location
- TownID lengths range from 4 to 14 digits
- Data sourced from the [Ministry of Land, Infrastructure, Transport and Tourism Position Reference Information Download Service](https://nlftp.mlit.go.jp/cgi-bin/isj/dls/_choose_method.cgi)

## Usage
```js
import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
const townid = await TownID.find("Fukui Prefecture", "Sabae City", "Shinhokkaido 1-chome");
console.log(townid); // E9138732346
```

## Data / API
This project uses data from the Ministry of Land, Infrastructure, Transport and Tourism Position Reference Information Download Service.

## License
MIT License