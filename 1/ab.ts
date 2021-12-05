export const a = "a";

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => Number(x));

console.log(ipt);

const pt1 = ipt
  .map((x, i) => {
    if (i !== 0 && x > ipt[i - 1]) {
      return true;
    } else {
      return false;
    }
  })
  .filter((v) => v === true).length;

console.log(pt1);

const slicingWindows = (arr: number[], size: number) => {
  if (size > arr.length) {
    return arr;
  }
  const result: number[] = [];
  const lastWindow = arr.length - size;
  for (let i = 0; i <= lastWindow; i += 1) {
    result.push(arr.slice(i, i + size).reduce((x, y) => x + y));
  }
  return result;
};

const pt2 = slicingWindows(ipt, 3);

const res = pt2
  .map((x, i) => {
    if (i !== 0 && x > pt2[i - 1]) {
      return true;
    } else {
      return false;
    }
  })
  .filter((v) => v === true).length;
console.log(res);
