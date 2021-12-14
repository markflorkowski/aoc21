export {};

const ipt = Deno.readTextFileSync("./input.txt").split("\n\n")[0];

const rules = Deno.readTextFileSync("./input.txt")
  .split("\n\n")[1]
  .split("\n")
  .map((x) => x.split(" -> ") as [string, string]);

const rulesMap = new Map<string, string>(rules);

let pairs = new Map<string, number>();
for (let i = 1; i < ipt.length; i++) {
  pairs.set(ipt[i - 1] + ipt[i], (pairs.get(ipt[i - 1] + ipt[i]) ?? 0) + 1);
}

const counts = new Map<string, number>();
ipt.split("").forEach((x) => {
  counts.set(x, (counts.get(x) ?? 0) + 1);
});

let steps = 0;
while (steps < 40) {
  const newPairs = new Map<string, number>();
  pairs.forEach((v, p) => {
    const rpl = rulesMap.get(p);
    if (rpl) {
      const p0 = p[0] + rpl;
      const p1 = rpl + p[1];

      counts.set(rpl, (counts.get(rpl) ?? 0) + v);

      newPairs.set(p0, (newPairs.get(p0) ?? 0) + v);
      newPairs.set(p1, (newPairs.get(p1) ?? 0) + v);
    }
  });
  pairs = newPairs;
  steps++;
}

let [min, max] = [Infinity, 0];

counts.forEach((x) => {
  if (x > max) max = x;
  if (x < min) min = x;
});

console.log(max - min);
