export {};

let test = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

const ipt = Deno.readTextFileSync("./input.txt").split("\n\n")[0].split("\n");

const inst = Deno.readTextFileSync("./input.txt")
  .split("\n\n")[1]
  .split("\n")
  .map((x) => x.split("fold along ")[1])
  .map((x) => x.split("="));

let points = new Set<string>(ipt);

inst.forEach((ins) => {
  const first = ins;
  const cur = new Set<string>();

  if (first[0] === "x") {
    points.forEach((point) => {
      if (parseInt(point.split(",")[0]) > parseInt(first[1])) {
        cur.add(
          [
            parseInt(first[1]) -
              (parseInt(point.split(",")[0]) - parseInt(first[1])),
            parseInt(point.split(",")[1]),
          ].join(",")
        );
      } else {
        cur.add(point);
      }
    });
  }

  if (first[0] === "y") {
    points.forEach((point) => {
      if (parseInt(point.split(",")[1]) > parseInt(first[1])) {
        cur.add(
          [
            parseInt(point.split(",")[0]),
            parseInt(first[1]) -
              (parseInt(point.split(",")[1]) - parseInt(first[1])),
          ].join(",")
        );
      } else {
        cur.add(point);
      }
    });
  }

  points = cur;
});

let map = "";
for (let y = 0; y < 6; y++) {
  for (let x = 0; x < 40; x++) {
    if (points.has(`${x},${y}`)) {
      map += "#";
    } else {
      map += " ";
    }
  }
  map += "\n";
}

console.log(map);
