export const a = "a";

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split(" -> "))
  .map((x) =>
    x.map((z) => ({
      x: parseInt(z.split(",")[0]),
      y: parseInt(z.split(",")[1]),
    }))
  );

//console.log(ipt);

const makeKeys = (line: { x: number; y: number }[]) => {
  const arr: string[] = [];
  if (line[0].x === line[1].x) {
    for (
      let i = Math.min(line[0].y, line[1].y);
      i <= Math.max(line[0].y, line[1].y);
      i++
    ) {
      arr.push(`${line[0].x},${i}`);
    }
    return arr;
  } else if (line[0].y === line[1].y) {
    for (
      let i = Math.min(line[0].x, line[1].x);
      i <= Math.max(line[0].x, line[1].x);
      i++
    ) {
      arr.push(`${i},${line[0].y}`);
    }
    return arr;
  } else {
    const slope = (line[0].y - line[1].y) / (line[0].x - line[1].x);
    for (
      let x = Math.min(line[0].x, line[1].x);
      x <= Math.max(line[0].x, line[1].x);
      x++
    ) {
      for (
        let y = Math.min(line[0].y, line[1].y);
        y <= Math.max(line[0].y, line[1].y);
        y++
      ) {
        if (y - line[0].y == slope * (x - line[0].x)) {
          arr.push(`${x},${y}`);
        }
      }
    }
    return arr;
  }
};

const visitedPoints = new Map<string, number>();

ipt.forEach((line) => {
  const points = makeKeys(line);
  points!.forEach((pt) => {
    visitedPoints.set(pt, (visitedPoints.get(pt) ?? 0) + 1);
  });
});

console.log(Array.from(visitedPoints.values()).filter((x) => x > 1).length);
