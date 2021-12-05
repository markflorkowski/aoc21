const ipt3b =  //Deno.readTextFileSync("./input.txt")
`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`
  .split("\n")
  .map((x) => x.split("").map((y) => parseInt(y)));

//console.log(ipt3b);

const modeArray = (array: number[]) => {
  if (
    array.filter((x) => x == 1).length === array.filter((x) => x == 0).length
  ) {
    return 1;
  } else {
    if (
      array.filter((x) => x == 1).length > array.filter((x) => x == 0).length
    ) {
      return 1;
    } else {
      return 0;
    }
  }
};

const modeArray2 = (array: number[]) => {
  if (
    array.filter((x) => x == 1).length === array.filter((x) => x == 0).length
  ) {
    return 0;
  } else {
    if (
      array.filter((x) => x == 1).length > array.filter((x) => x == 0).length
    ) {
      return 0;
    } else {
      return 1;
    }
  }
};

let filtered: number[][] = ipt3b;

for (const i in [...Array(5).keys()]) {
  const array = filtered.map((x) => x[i]);
  const mostcommon = modeArray(array);

  filtered = filtered.filter((x) => x[i] === mostcommon);
}

const oxy = filtered.flat().join("");

console.log("oxy: ", oxy);

filtered = ipt3b;

for (const j in [...Array(5).keys()]) {
  const array = filtered.map((x) => x[j]);
  if (array.length === 0) {
    console.log(array);
    break;
  }
  const leastcommon = modeArray2(array);

  console.log(array.length);
  console.log(array);

  filtered = filtered.filter((x) => x[j] === leastcommon);
}

const co2 = filtered.flat().join("");
console.log("co2: ", co2);
