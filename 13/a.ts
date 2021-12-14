export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n\n")[0]
  .split("\n")
  .map((x) => x.split(","))
  .map((x) => [parseInt(x[0]), parseInt(x[1])]);

const inst = Deno.readTextFileSync("./input.txt")
  .split("\n\n")[1]
  .split("\n")
  .map((x) => x.split("fold along ")[1])
  .map((x) => x.split("="));

console.log(ipt);
console.log(inst);

const first = inst[0];

const points = new Set();

if (first[0] === "x") {
  ipt.forEach((point) => {
    if (point[0] > parseInt(first[1])) {
      points.add(
        [parseInt(first[1]) - (point[0] - parseInt(first[1])), point[1]].join(
          ","
        )
      );
    } else {
      points.add(point.join(","));
    }
  });
}

if (first[0] === "y") {
  ipt.forEach((point) => {
    if (point[1] > parseInt(first[1])) {
      points.add(
        [point[0], parseInt(first[1]) - (point[1] - parseInt(first[1]))].join(
          ","
        )
      );
    } else {
      points.add(point.join(","));
    }
  });
}

console.log(points.size);
