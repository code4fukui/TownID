import { CSV } from "https://js.sabae.cc/CSV.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";
import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";
import { unzip } from "https://taisukef.github.io/zlib.js/es/unzip.js";
import { readDir } from "./readDir.js";
import { StrArray } from "./StrArray.js";

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
  //console.log(txt);

  const data = CSV.parse(txt);
  
  const fn = f.substring(f.lastIndexOf("/") + 1);

  //const data = CSV.toJSON(await CSV.fetch(f));

  const prelevel = 16;
  const codes = data.map(d => Geo3x3.encode(d.緯度, d.経度, prelevel));
  if (!StrArray.isUnique(codes)) {
    const nu = StrArray.getNotUnique(codes);
    console.log("is not unique: " + fn, nu);
    throw new Error("is not unique: " + fn);
    continue;
  }
  const prefix = StrArray.getPrefix(codes);
  const level = StrArray.getUniqueLength(codes);
  data.forEach(d => {
    const geo3x3 = Geo3x3.encode(d.緯度, d.経度, level);
    d.geo3x3 = geo3x3;
    //d.localcode = prefix + "_" + d.geo3x3.substring(prefix.length);
    //d.localcode = geo3x3.substring(prefix.length);
  });

  //console.log(data.map(d => [d.大字町丁目名, d.geo3x3, d.localcode]));
  //console.log(data.map(d => [d.大字町丁目名, d.geo3x3, d.localcode]));
  const csvfn = fn.substring(0, 2) + ".csv";
  console.log(level, csvfn);
  await Deno.writeTextFile("data/" + csvfn, CSV.stringify(data));
}
