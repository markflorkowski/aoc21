const ipt3a = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split("").map((y) => parseInt(y)));

// console.log(ipt3a);
const gamma: number[] = [];
for (const i in [...Array(12).keys()]) {
  const array = ipt3a.map((x) => x[i]);
  gamma.push(
    array.reduce(
      (a, b, _i, arr) =>
        arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
          ? a
          : b,
      -1
    )
  );
}

const flipbits = (str: string) =>
  str
    .split("")
    .map((b) => (1 - parseInt(b)).toString())
    .join("");

const gammaB = gamma.join("");
const epsilonB = flipbits(gammaB);

console.log(parseInt(gammaB, 2) * parseInt(epsilonB, 2));
