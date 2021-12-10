export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split(""));

//console.log(ipt);

const open = ["{", "[", "(", "<"];
const close = ["}", "]", ")", ">"];

const scores = [3, 2, 1, 4];

const calcScore = (arr: string[]) => {
  let s = 0;
  const narr = arr.map((xx) => {
    return scores[open.indexOf(xx)];
  });

  narr.reverse().forEach((yy) => {
    s *= 5;
    s += yy;
  });

  return s;
};

const sArr: number[] = [];
ipt.forEach((row) => {
  let isV = true;
  const valid = [row[0]];

  for (let i = 1; i < row.length; i++) {
    if (open.includes(row[i])) {
      valid.push(row[i]);
    }
    if (close.includes(row[i])) {
      const opening = valid.pop();
      if (open[close.indexOf(row[i])] !== opening) {
        //invalid
        isV = false;
        break;
      }
    }
  }
  if (isV) {
    sArr.push(calcScore(valid));
  }
});

console.log(sArr.sort((a, b) => a - b)[(sArr.length - 1) / 2]);
