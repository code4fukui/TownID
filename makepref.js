import { CSV } from "https://js.sabae.cc/CSV.js";
import { JAPAN_PREF } from "https://js.sabae.cc/JAPAN_PREF.js";
import { fix0 } from "https://js.sabae.cc/fix0.js";

const pref = [];
for (let i = 0; i < JAPAN_PREF.length; i++) {
  const jp = JAPAN_PREF[i];
  pref.push({ code: fix0(i + 1, 2), pref: jp });
}
await Deno.writeTextFile("data/pref.csv", CSV.stringify(pref));
