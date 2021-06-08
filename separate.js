import { CSV } from "https://js.sabae.cc/CSV.js";

const dpref = CSV.toJSON(await CSV.fetch("data/pref.csv"));
const dcity = CSV.toJSON(await CSV.fetch("data/city.csv"));
const data = CSV.toJSON(await CSV.fetch("data/all.csv"));

const pref = {};
const city = {};
for (const d of data) {
  const prefcode = dpref.find(p => p.pref == d.pref).code;
  const hitcity = dcity.find(c => c.city == d.city);
  const citycode = hitcity.code;
  d.townid = d.geo3x3.substring(hitcity.prefix.length);
  //console.log(d);
  console.log(prefcode, citycode);
  if (!pref[prefcode]) {
    pref[prefcode] = [d];
  } else {
    pref[prefcode].push(d);
  }
  if (!city[citycode]) {
    city[citycode] = [d];
  } else {
    city[citycode].push(d);
  }
}
for (const p in pref) {
  const data = pref[p];
  await Deno.writeTextFile("data/pref/" + p + ".csv", CSV.stringify(data.map(d => {
    return {
      geo3x3: d.geo3x3,
      city: d.city,
      town: d.town,
    }
  })));
}
for (const p in city) {
  const data = city[p];
  await Deno.writeTextFile("data/town/" + p + ".csv", CSV.stringify(data.map(d => {
    return {
      townid: d.townid,
      town: d.town,
    }
  })));
}
//await Deno.writeTextFile("data/all.csv", CSV.stringify(all));
