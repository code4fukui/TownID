import { CSV } from "https://js.sabae.cc/CSV.js";
import { StrArray } from "./StrArray.js";

const data = CSV.toJSON(await CSV.fetch("data/x-all.csv"));
/*
for (const d of data) {
  console.log(d.geo3x3.length);
}
*/
const codes = data.map(d => d.geo3x3);
//console.log(codes);
//all.forEach(d => d.geo3x3 = StrArray.getUnique(codes, d.geo3x3));
console.log(StrArray.getUnique(codes, "E913735343784295"));
/*
console.log(all.length);
*/

data.forEach(d => d.geo3x3 = StrArray.getUnique(codes, d.geo3x3));

await Deno.writeTextFile("data/all.csv", CSV.stringify(data));
