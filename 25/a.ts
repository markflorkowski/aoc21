export {};

type StrSet = Set<string>;

const ipt = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .map((x) => x.split(""));

let [east, south] = [new Set<string>(), new Set<string>()];

ipt.forEach((row, y) => {
  row.forEach((c, x) => {
    if (c === ">") east.add(`${x},${y}`);
    if (c === "v") south.add(`${x},${y}`);
  });
});

const step = (east: StrSet, south: StrSet): [boolean, StrSet, StrSet] => {
  let change = false;
  let [nEast, nSouth] = [new Set<string>(), new Set<string>()];

  east.forEach((r) => {
    const x = parseInt(r.split(",")[0]);
    const y = parseInt(r.split(",")[1]);
    const dx = (x + 1) % ipt[0].length;

    if (east.has(`${dx},${y}`) || south.has(`${dx},${y}`)) {
      nEast.add(`${x},${y}`);
    } else {
      nEast.add(`${dx},${y}`);
      change = true;
    }
  });
  south.forEach((r) => {
    const x = parseInt(r.split(",")[0]);
    const y = parseInt(r.split(",")[1]);
    const dy = (y + 1) % ipt.length;
    if (nEast.has(`${x},${dy}`) || south.has(`${x},${dy}`)) {
      nSouth.add(`${x},${y}`);
    } else {
      nSouth.add(`${x},${dy}`);
      change = true;
    }
  });

  return [change, nEast, nSouth];
};

let changed = true;
let steps = 0;
while (changed) {
  steps++;
  [changed, east, south] = step(east, south);
}

console.log("a:", steps);
