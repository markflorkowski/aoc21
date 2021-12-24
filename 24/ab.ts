import memoizy from "https://deno.land/x/memoizy/mod.ts";

const ipt = Deno.readTextFileSync("./input.txt").trim().split("\n");

const [AX, DZ, AY]: number[][] = [[], [], []];

ipt.forEach((line, i) => {
  if (line.includes("add x ") && !line.includes("add x z")) {
    AX.push(parseInt(line.split(" ")[2]));
  }
  if (line.includes("div z ")) {
    DZ.push(parseInt(line.split(" ")[2]));
  }
  if (line.includes("add y ") && i % 18 == 15) {
    AY.push(parseInt(line.split(" ")[2]));
  }
});

const runChunk = (ch: number, z: number, w: number) => {
  const x = AX[ch] + (z % 26);
  z = Math.floor(z / DZ[ch]);
  if (x != w) {
    z *= 26;
    z += w + AY[ch];
  }
  return z;
};

const zB: number[] = [5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 3, 2, 1];

const search = memoizy((ch: number, z: number) => {
  if (ch == 14 || z > 26 ** zB[ch]) {
    if (z === 0) return [""];
    return [];
  }
  let wOpts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const test = AX[ch] + (z % 26);
  if (wOpts.includes(test)) {
    wOpts = [test];
  }
  const ret: string[] = [];
  wOpts.forEach((w) => {
    const zNext = runChunk(ch, z, w);
    const nxt = search(ch + 1, zNext);
    nxt.forEach((x) => {
      ret.push(w.toString() + x);
    });
  });
  return ret;
});

const modelNumbers = search(0, 0).map((x) => parseInt(x));
console.log("a:", Math.max(...modelNumbers));
console.log("b:", Math.min(...modelNumbers));
