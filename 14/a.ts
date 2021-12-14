export {};

const ipt = Deno.readTextFileSync("./input.txt").split("\n\n")[0];

const rules = Deno.readTextFileSync("./input.txt")
  .split("\n\n")[1]
  .split("\n")
  .map((x) => x.split(" -> ") as [string, string]);

const rulesMap = new Map<string, string>(rules);

let temp = ipt;

let n = 0;
while (n < 10) {
  let newP = temp[0];
  for (let i = 1; i < temp.length; i++) {
    const pair = temp[i - 1] + temp[i];
    if (rulesMap.get(pair)) {
      newP += rulesMap.get(pair) + temp[i];
    } else {
      newP += temp[i];
    }
  }
  temp = newP;
  n++;
}

const counts = new Map<string, number>();

temp.split("").forEach((x) => {
  counts.set(x, (counts.get(x) ?? 0) + 1);
});

let [min, max] = [Infinity, 0];

counts.forEach((x) => {
  if (x > max) max = x;
  if (x < min) min = x;
});

console.log(max - min);
