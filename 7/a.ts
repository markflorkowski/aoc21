export const a = "a";

const ipt = Deno.readTextFileSync("./input.txt")
  .split(",")
  .map((x) => parseInt(x));

console.log(ipt);

const median = (values: number[]) => {
  values.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};

const med = median(ipt);

let sum = 0;
ipt.map((x) => {
  if (x < med) {
    sum += med - x;
  }
  if (x === med) {
    sum += 0;
  }
  if (x > med) {
    sum += x - med;
  }
});

console.log(sum);
