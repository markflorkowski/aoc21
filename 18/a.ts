export {};

type NArray<T> = (T | NArray<T>)[];

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => JSON.parse(x));

const canSplit = (arr: NArray<number>) => {
  return arr.flat(4).filter((x) => x >= 10).length !== 0;
};

const split = (arr: NArray<number>): NArray<number> => {
  const strArr = JSON.stringify(arr);

  const parts: string[] = [];

  let i = 0;
  while (i < strArr.length) {
    if (strArr[i] == "[") {
      parts.push("[");
      i++;
    } else if (strArr[i] == ",") {
      parts.push(",");
      i++;
    } else if (strArr[i] == "]") {
      parts.push("]");
      i++;
    } else if (strArr[i] == " ") {
      i++;
    } else {
      // number
      let j = i;
      while (j < strArr.length && !isNaN(+strArr[j])) {
        j++;
      }
      parts.push(strArr.slice(i, j));
      i = j;
    }
  }

  for (let j = 0; j < parts.length; j++) {
    if (!isNaN(+parts[j]) && parseInt(parts[j]) >= 10) {
      parts[j] = JSON.stringify([
        Math.floor(+parts[j] / 2),
        Math.ceil(+parts[j] / 2),
      ]);
      break;
    }
  }

  return JSON.parse(parts.join(""));
};

const canExplode = (arr: NArray<number>): boolean => {
  const strArr = JSON.stringify(arr);
  let depth = 0;
  for (let i = 0; i < strArr.length; i++) {
    if (depth === 5) break;

    if (strArr[i] == "[") {
      depth++;
    }
    if (strArr[i] == "]") {
      depth--;
    }
  }
  return depth === 5;
};

const explode = (arr: NArray<number>): NArray<number> => {
  const strArr = JSON.stringify(arr);
  let parts: string[] = [];

  let i = 0;
  while (i < strArr.length) {
    if (strArr[i] == "[") {
      parts.push("[");
      i++;
    } else if (strArr[i] == ",") {
      parts.push(",");
      i++;
    } else if (strArr[i] == "]") {
      parts.push("]");
      i++;
    } else if (strArr[i] == " ") {
      i++;
    } else {
      // number
      let j = i;
      while (j < strArr.length && !isNaN(+strArr[j])) {
        j++;
      }
      parts.push(strArr.slice(i, j));
      i = j;
    }
  }

  let depth = 0;

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p === "[") {
      depth++;
      if (depth === 5) {
        const left = parts[i + 1];
        const right = parts[i + 3];

        let leftI = -1;
        let rightI = -1;
        for (let j = 0; j < parts.length; j++) {
          if (!isNaN(+parts[j]) && j < i) {
            leftI = j;
          } else if (!isNaN(+parts[j]) && j > i + 3 && rightI == -1) {
            rightI = j;
          }
        }

        if (rightI !== -1) {
          parts[rightI] = (
            parseInt(parts[rightI]) + parseInt(right)
          ).toString();
        }

        parts = [...parts.slice(0, i), "0", ...parts.slice(i + 5)];

        if (leftI !== -1) {
          parts[leftI] = (parseInt(parts[leftI]) + parseInt(left)).toString();
        }
        return JSON.parse(parts.join(""));
      }
    } else if (p === "]") {
      depth--;
    } else continue;
  }
  return arr;
};

const reduce = (arr: NArray<number>): NArray<number> => {
  let newArr = arr;

  while (canExplode(newArr) || canSplit(newArr)) {
    if (canExplode(newArr)) {
      // repeat until this is not the case
      while (canExplode(newArr)) {
        newArr = explode(newArr);
      }
    } else if (canSplit(newArr)) {
      newArr = split(newArr);
    }
  }

  return newArr;
};

let final: NArray<number> = ipt.map((item) => {
  let last = item;
  while (last !== reduce(last)) {
    last = reduce(last);
  }
  return last;
});

while (final.length > 1) {
  let last: NArray<number> = [final[0], final[1]];
  while (last !== reduce(last)) {
    last = reduce(last);
  }
  final.shift();
  final.shift();
  final = [last, ...final];
}

const magnitude = (arr: NArray<number>): number => {
  if (typeof arr[0] === "number" && typeof arr[1] === "number")
    return 3 * arr[0] + 2 * arr[1];
  else if (typeof arr[0] === "number" && typeof arr[1] === "object") {
    return 3 * arr[0] + 2 * magnitude(arr[1]);
  } else if (typeof arr[0] === "object" && typeof arr[1] === "number") {
    return 3 * magnitude(arr[0]) + 2 * arr[1];
  } else {
    return (
      3 * magnitude(arr[0] as NArray<number>) +
      2 * magnitude(arr[1] as NArray<number>)
    );
  }
};

console.log(magnitude(final[0] as NArray<number>));
