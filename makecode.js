import { CSV } from "https://js.sabae.cc/CSV.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";
import { unzip } from "https://taisukef.github.io/zlib.js/es/unzip.js";
import { readDir } from "./readDir.js";
import { StrArray } from "./StrArray.js";
import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";

/*
    "都道府県コード": "18",
    "都道府県名": "福井県",
    "市区町村コード": "18207",
    "市区町村名": "鯖江市",
    "大字町丁目コード": "182070070000",
    "大字町丁目名": "西大井町",
    "緯度": "35.958773",
    "経度": "136.139064",
    "原典資料コード": "0",
    "大字・字・丁目区分コード": "1"
*/

const codes = {};

const files = await readDir("temp");
for (const f of files) {
  if (!f.endsWith(".zip")) {
    continue;
  }
  const zip = await Deno.readFile(f);
  const zips = unzip(zip);
  const filenames = zips.getFilenames();
  const file = filenames.find(f => f.endsWith(".csv"));
  const txt = SJIS.decodeAuto(zips.decompress(file));
  const data = CSV.parse(txt);

  for (const d of data) {
    const code = d.市区町村コード;
    if (!codes[code]) {
      codes[code] = [d];
    } else {
      codes[code].push(d);
    }
  }
}
const mk = Object.values(codes).sort((a, b) => parseInt(a[0].市区町村コード, 10) - parseInt(b[0].市区町村コード, 10));
const dst = mk.map(dd => {
  const d = dd[0];
  const level = 16;
  const codes = dd.map(d => Geo3x3.encode(d.緯度, d.経度, level));
  const prefix = StrArray.getPrefix(codes);
  return {
    code: d.市区町村コード,
    city: d.市区町村名,
    prefix,
  }
});
console.log(dst, dst.length);

await Deno.writeTextFile("data/city.csv", CSV.stringify(dst));
