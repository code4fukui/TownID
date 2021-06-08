import { fix0 } from "https://js.sabae.cc/fix0.js";

const downloadAll = async () => {
  //const url = "https://nlftp.mlit.go.jp/isj/dls/data/13.0b/08000-13.0b.zip";
  for (let i = 1; i <= 47; i++) {
    const fn = `${fix0(i, 2)}000-13.0b.zip`
    const url = "https://nlftp.mlit.go.jp/isj/dls/data/13.0b/" + fn;
    const bin = new Uint8Array(await (await fetch(url)).arrayBuffer());
    await Deno.writeFile("temp/" + fn, bin);
    console.log("downloaded");
  }
};

await downloadAll();
