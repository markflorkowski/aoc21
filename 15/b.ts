export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((row) => row.split("").map((i) => parseInt(i, 10)));

const fullIpt = Array.apply(null, Array(ipt.length * 5)).map((_, y) =>
  Array.apply(null, Array(ipt[0].length * 5)).map((_, x) => {
    const realX = x % ipt[0].length;
    const realY = y % ipt.length;

    const score =
      ((ipt[realY][realX] +
        Math.floor(y / ipt.length) +
        Math.floor(x / ipt[0].length) -
        1) %
        9) +
      1;

    return score;
  })
);

const scoreBoard: number[][] = fullIpt.map((x) => x.map((_) => Infinity));
scoreBoard[0][0] = 0;

const width = fullIpt[0].length;
const height = fullIpt.length;

const neighbors = (x: number, y: number) => {
  const d = [];
  if (x > 0) d.push({ x: x - 1, y });
  if (y > 0) d.push({ x, y: y - 1 });
  if (x < width - 1) d.push({ x: x + 1, y });
  if (y < height - 1) d.push({ x, y: y + 1 });

  return d;
};

let lastBoard: number[][] = [];
while (scoreBoard.join("") !== lastBoard.join("")) {
  lastBoard = scoreBoard.map((r) => [...r]);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (x + y === 0) continue;
      scoreBoard[y][x] =
        Math.min(...neighbors(x, y).map((pt) => scoreBoard[pt.y][pt.x])) +
        fullIpt[y][x];
    }
  }
}

console.log(scoreBoard[height - 1][width - 1]);
