export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((row) => row.split("").map((i) => parseInt(i, 10)));

const width = ipt[0].length;
const height = ipt.length;

const scoreBoard: number[][] = ipt.map((x) => x.map((_) => Infinity));

const x = width - 1;
const y = height - 1;

scoreBoard[y][x] = ipt[y][x];

const neighbors = (x: number, y: number) => {
  const d = [];
  if (x > 0) d.push({ x: x - 1, y });
  if (y > 0) d.push({ x, y: y - 1 });
  if (x < width - 1) d.push({ x: x + 1, y });
  if (y < height - 1) d.push({ x, y: y + 1 });

  return d;
};

const finalScores: number[] = [];

const traverse = (x: number, y: number) => {
  if (ipt[y]?.[x] === undefined) {
    return;
  }

  let score = Math.min(...neighbors(x, y).map((pt) => scoreBoard[pt.y][pt.x]));

  if (x + y === 0) {
    finalScores.push(score);
    return;
  }

  score = score + ipt[y][x];

  if (score < scoreBoard[y][x]) {
    scoreBoard[y][x] = score;

    traverse(x - 1, y);
    traverse(x, y - 1);
    return;
  }
};

traverse(x - 1, y);
traverse(x, y - 1);

console.log(Math.min(...finalScores));
