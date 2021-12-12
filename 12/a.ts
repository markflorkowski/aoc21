export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split("-"));

console.log(ipt);

const connections = new Map<string, string[]>();

ipt.forEach((x) => {
  connections.set(x[0], [...(connections.get(x[0]) ?? []), x[1]]);
  connections.set(x[1], [...(connections.get(x[1]) ?? []), x[0]]);
});

console.log(connections);

const isLarge = (cave: string) => {
  if (cave === cave.toUpperCase()) return true;
  return false;
};

const traverse: (cur: string, path: string[]) => string[][] = (cur, path) => {
  // don't visit small caves twice
  if (!isLarge(cur) && path.includes(cur)) return [];

  if (cur === "end") return [[...path, "end"]];

  path = [...path, cur];
  return connections.get(cur)!.flatMap((next) => traverse(next, path));
};

const allPaths = connections.get("start")!.flatMap((cave) => {
  return traverse(cave, ["start"]);
});

console.log(allPaths.length);
