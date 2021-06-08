const readDir = async (path) => {
  const res = [];
  const find = async (path) => {
    const dir = Deno.readDir(path);
    for await (const f of dir) {
      const fn = path + "/" + f.name;
      if (f.isDirectory) {
        await find(fn);
      } else {
        res.push(fn);
      }
    }
  };
  await find(path);
  return res;
};
export { readDir };
