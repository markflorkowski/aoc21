export {};

const grid = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split("").map((y) => parseInt(y)));

//console.log(ipt);

const neighbors = (x: number, y: number) => {
  return [
    { x: x - 1, y },
    { x: x - 1, y: y - 1 },
    { x: x - 1, y: y + 1 },

    { x, y: y - 1 },
    { x, y: y + 1 },

    { x: x + 1, y },
    { x: x + 1, y: y + 1 },
    { x: x + 1, y: y - 1 },
  ];
};

const flash = (pt: { x: number; y: number }) => {
  if (grid[pt.x]?.[pt.y] === undefined) return;

  grid[pt.x][pt.y] += 1;

  if (grid[pt.x][pt.y] == 10) {
    flashes++;
    neighbors(pt.x, pt.y).forEach((n) => flash(n));
  }
};

let flashes = 0;
const step = () => {
  //increment all
  grid.forEach((row, x) => {
    row.forEach((_, y) => {
      flash({ x, y });
    });
  });

  grid.forEach((row, x) => {
    row.forEach((cur, y) => {
      if (cur > 9) {
        grid[x][y] = 0;
      }
    });
  });

  console.log("\n", grid.map((x) => x.join("")).join("\n"));

  return grid;
};

let i = 0;
while (!grid.every((x) => x.every((ip) => ip === 0))) {
  step();
  i++;
}

console.log(i);
