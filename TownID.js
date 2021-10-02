import { CSV } from "https://js.sabae.cc/CSV.js";

let pref = null;
let city = null;
let town = {}; // cache
const init = async () => {
  if (!pref) {
    pref = await fetchCSV("data/pref.csv"); //  0.6kb
    city = await fetchCSV("data/city.csv"); // 55kb
  }
};

const fetchCSV = async (url) => {
  const base = "https://code4fukui.github.io/TownID/";
  return CSV.toJSON(await CSV.fetch(base + url));
};

class TownID {
  static async find(spref, scity, stown) {
    await init();
    const npref = pref.find(p => p.pref == spref)?.code;
    if (!npref) {
      return null;
    }
    const pcity = city.find(c => c.city == scity && c.code.startsWith(npref));
    if (!pcity) {
      return null;
    }
    const ntown = pcity.code;
    if (!ntown) {
      return null;
    }
    if (!town[ntown]) {
      town[ntown] = await fetchCSV("data/town/" + ntown + ".csv");
    }
    const townid = town[ntown].find(t => t.town == stown)?.townid;
    if (!townid) {
      return null;
    }
    return pcity.prefix + townid;
  }
  static async getPrefs() {
    await init();
    return pref.map(p => p.pref);
  }
  static async getCities(spref) {
    await init();
    const npref = pref.find(p => p.pref == spref)?.code;
    if (!npref) {
      return null;
    }
    return city.filter(c => c.code.startsWith(npref)).map(c => c.city);
  }
  static async getTowns(spref, scity) {
    const ntown = await TownID.getLGCode(spref, scity);
    if (!ntown) {
      return null;
    }
    if (!town[ntown]) {
      town[ntown] = await fetchCSV("data/town/" + ntown + ".csv");
    }
    return town[ntown].map(t => t.town);
  }
  static async getLGCode(spref, scity) {
    await init();
    const npref = pref.find(p => p.pref == spref)?.code;
    if (!npref) {
      const apref = pref.find(p => spref.startsWith(p.pref));
      if (!apref) {
        return null;
      }
      const scity = spref.substring(apref.pref.length);
      const npref = apref.code;
      const pcity = city.find(c => c.city == scity && c.code.startsWith(npref));
      if (!pcity) {
        return null;
      }
      return pcity.code;
    }
    if (scity == undefined) {
      return npref;
    }
    const pcity = city.find(c => c.city == scity && c.code.startsWith(npref));
    if (!pcity) {
      return null;
    }
    return pcity.code;
  }
}
export { TownID };
