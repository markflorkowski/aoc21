export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split("").map((y) => parseInt(y)));

//console.log(ipt);

const xMax = ipt.length - 1;
const yMax = ipt[0].length - 1;

const neighbors = (x: number, y: number) => {
  const d = [];
  if (x > 0) d.push({ x: x - 1, y });
  if (y > 0) d.push({ x, y: y - 1 });
  if (x < xMax) d.push({ x: x + 1, y });
  if (y < yMax) d.push({ x, y: y + 1 });

  return d;
};

const isLowPt = (val: number, neighbors: { x: number; y: number }[]) => {
  return neighbors.every((pt) => val < ipt[pt.x][pt.y]);
};

const sizes: number[] = [];
ipt.forEach((row, x) => {
  row.forEach((val, y) => {
    if (isLowPt(val, neighbors(x, y))) {
      const visited: string[] = [];
      let toVisit = [{ x, y }];

      while (toVisit.length) {
        const cur = toVisit.shift()!;

        if (ipt[cur.x][cur.y] === 9) continue;
        if (visited.includes(`${cur.x}:${cur.y}`)) continue;

        visited.push(`${cur.x}:${cur.y}`);

        toVisit = [...neighbors(cur!.x, cur!.y), ...toVisit];
      }
      sizes.push(visited.length);
    }
  });
});

console.log(
  "sizes: ",
  sizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b)
);
