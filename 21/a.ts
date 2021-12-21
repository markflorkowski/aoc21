export {};

let [p1, p2] = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .map((x) => parseInt(x.slice(x.length - 1)));

let [s1, s2] = [0, 0];

let d = 1;
const dMax = 100;
const roll = () => {
  const dc = d % dMax === 0 ? dMax : d % dMax;
  const dc1 = (dc + 1) % dMax === 0 ? dMax : (dc + 1) % dMax;
  const dc2 = (dc + 2) % dMax === 0 ? dMax : (dc + 2) % dMax;

  d = (dc + 3) % dMax === 0 ? dMax : (dc + 3) % dMax;

  return dc + dc1 + dc2;
};

const move = (pos: number, amt: number) => {
  const np = pos + amt;
  if (np > 10) {
    return np % 10 === 0 ? 10 : np % 10;
  } else {
    return np;
  }
};

let turns = 0;

while (s1 <= 1000 && s2 <= 1000) {
  const r1 = roll();
  turns += 3;

  p1 = move(p1, r1);
  s1 += p1;

  if (s1 >= 1000) break;

  const r2 = roll();
  turns += 3;

  p2 = move(p2, r2);
  s2 += p2;
}

console.log(turns * Math.min(s1, s2));
