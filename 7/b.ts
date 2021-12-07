export const a = "a";

const ipt = Deno.readTextFileSync("./input.txt")
  .split(",")
  .map((x) => parseInt(x));

const average = (array: number[]) =>
  array.reduce((a, b) => a + b) / array.length;

const avg = Math.floor(average(ipt));

const cost = (x: number, r: number) => {
  let steps = Math.abs(r - x);
  return (steps * (steps + 1)) / 2;
};

let sum = 0;
ipt.map((x) => {
  sum += cost(x, avg);
});

console.log(sum);
