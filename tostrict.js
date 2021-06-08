import { CSV } from "https://js.sabae.cc/CSV.js";
import { StrictCSV } from "https://code4fukui.github.io/StrictCSV/js/StrictCSV.js";

const data = CSV.toJSON(await CSV.fetch("data/all.csv"));
const data2 = data.map(d => {
  return {
    geo3x3: d.geo3x3,
    town: d.town,
    city: d.city,
    pref: d.pref,
  };
});
//console.log(data[0]);
await Deno.writeTextFile("data/all.s.csv", StrictCSV.stringify(data2));

// chek
const data3 = await StrictCSV.load("data/all.s.csv");
/*
if (JSON.stringify(data) != JSON.stringify(data3)) {
  throw new Error("data not match");
}
*/
if (data.length != data3.length) {
  throw new Error("length not match");
}
for (let i = 0; i < data.length; i++) {
  const d = data[i];
  const d3 = data3[i];
  for (const n in d) {
    if (d[n] != d3[n]) {
      throw new Error("not match", d, d3);
    }
  }
}
console.log("ok!");
