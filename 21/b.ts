export {};

const [p1, p2] = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .map((x) => parseInt(x.slice(x.length - 1)));

const move = (pos: number, amt: number) => {
  const np = pos + amt;
  if (np > 10) {
    return np % 10 === 0 ? 10 : np % 10;
  } else {
    return np;
  }
};

const cache = new Map<string, [number, number]>();

const recurse = (p1: number, p2: number, s1 = 0, s2 = 0, odd = true) => {
  //base case
  if (s1 >= 21) return [1, 0];
  if (s2 >= 21) return [0, 1];

  const key = JSON.stringify({ p1, s1, p2, s2, odd });
  if (cache.has(key)) return cache.get(key)!;

  let wins: [number, number] = [0, 0];

  for (let d1 = 1; d1 < 4; d1++) {
    for (let d2 = 1; d2 < 4; d2++) {
      for (let d3 = 1; d3 < 4; d3++) {
        const score = d1 + d2 + d3;

        const np1 = odd ? move(p1, score) : p1;
        const np2 = odd ? p2 : move(p2, score);
        const ns1 = odd ? s1 + np1 : s1;
        const ns2 = odd ? s2 : s2 + np2;

        const [wp1, wp2] = recurse(np1, np2, ns1, ns2, !odd);
        wins = [wins[0] + wp1, wins[1] + wp2];
      }
    }
  }
  cache.set(key, wins);

  return wins;
};

console.log(Math.max(...recurse(p1, p2)));
