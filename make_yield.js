import { CSV } from "https://js.sabae.cc/CSV.js";

async function* readDirR(path) {
  async function* find(path) {
    const dir = Deno.readDir(path);
    console.log(path);
    for await (const f of dir) {
      console.log(f);
      if (f.isDirectory) {
        console.log(path + "/" + f.name);
        find(path + "/" + f.name);
      } else {
        console.log("y", f);
        yield f;
      }
    }
  };
  for await (f of find(path)) {
    yield f;
  };
}

for await (const f of readDirR("data")) {
  console.log(f);
}
