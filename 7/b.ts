export const a = "a";

const ipt = Deno.readTextFileSync("./input.txt")
  .split(",")
  .map((x) => parseInt(x));

//console.log(ipt);

const median = (values: number[]) => {
  values.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};

const average = (array: number[]) =>
  array.reduce((a, b) => a + b) / array.length;

const avg = Math.floor(average(ipt));

const cost = (x: number, r: number) => {
  let fuel = 0;
  let steps = Math.abs(r - x);
  while (steps > 0) {
    fuel += steps;
    steps--;
  }

  return fuel;
};

let sum = 0;
ipt.map((x) => {
  sum += cost(x, avg);
});

console.log(sum);
