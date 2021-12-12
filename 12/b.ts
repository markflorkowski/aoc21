export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split("-"));

//console.log(ipt);

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

let count = 0;
const traverse: (cur: string, path: string, double: boolean) => void = (
  cur,
  path,
  double
) => {
  //immediately end at end
  if (cur === "end") {
    count++;
    return;
  }
  // don't visit more than one small caves twice, never revisit start
  if (
    cur === "start" ||
    (!isLarge(cur) && path.split(cur).length > 2) ||
    (!isLarge(cur) && path.split(cur).length > 1 && double)
  ) {
    return;
  }

  if (!isLarge(cur) && path.split(cur).length > 1) {
    connections
      .get(cur)!
      .forEach((next) => traverse(next, `${path}${cur},`, true));
  } else {
    connections
      .get(cur)!
      .forEach((next) => traverse(next, `${path}${cur},`, double));
  }
};

connections.get("start")!.forEach((cave) => {
  return traverse(cave, "start,", false);
});

console.log(count);
