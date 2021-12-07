export const a = "a";

const ipt = Deno.readTextFileSync("./input.txt")
  .split(",")
  .map((x) => parseInt(x));

//console.log(ipt);

const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

ipt.forEach((p) => {
  counts[p] = counts[p] + 1;
});

let days = 256;

while (days > 0) {
  const p = counts.shift()!;
  counts.push(p);
  counts[6] += p;
  days--;
}

console.log(counts.reduce((a, b) => a + b));
