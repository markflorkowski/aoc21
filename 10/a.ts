export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split(""));

//console.log(ipt);

const open = ["{", "[", "(", "<"];
const close = ["}", "]", ")", ">"];

const scores = [1197, 57, 3, 25137];

let sum = 0;
ipt.forEach((row) => {
  const valid = [row[0]];

  for (let i = 1; i < row.length; i++) {
    if (open.includes(row[i])) {
      valid.push(row[i]);
    }
    if (close.includes(row[i])) {
      const opening = valid.pop();

      if (open[close.indexOf(row[i])] !== opening) {
        //invalid
        sum += scores[close.indexOf(row[i])];
        break;
      }
    }
  }
});

console.log(sum);
