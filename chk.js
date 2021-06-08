import { CSV } from "https://js.sabae.cc/CSV.js";

const pref = CSV.toJSON(await CSV.fetch("data/pref.csv"));
console.log("n_pref", pref.length);

const city = CSV.toJSON(await CSV.fetch("data/city.csv"));
console.log("n_city", city.length);

const data = CSV.toJSON(await CSV.fetch("data/all.csv"));
console.log("n_town", data.length);

let min = 100;
let max = 0;
for (const d of data) {
  const len = d.geo3x3.length;
  if (len > max) {
    max = len;
  } else if (len < min) {
    min = len;
  }
}
console.log("min_len ", min);
console.log("max_len ", max);
