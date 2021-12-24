export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .map((x) => ({ ins: x.split(" ")[0], vals: x.split(" ").slice(1) }));

let registers: { [key: string]: number } = {
  w: 0,
  x: 0,
  y: 0,
  z: 0,
};

const evaluate = (line: typeof ipt[number]) => {
  //   inp a - Read an input value and write it to variable a.
  if (line.ins === "inp") {
    registers[line.vals[0]] = testval.pop()!;
  }
  // add a b - Add the value of a to the value of b, then store the result in variable a.
  if (line.ins === "add") {
    if (isNaN(parseInt(line.vals[1]))) {
      registers[line.vals[0]] += registers[line.vals[1]];
    } else {
      registers[line.vals[0]] += parseInt(line.vals[1]);
    }
  }
  // mul a b - Multiply the value of a by the value of b, then store the result in variable a.
  if (line.ins === "mul") {
    if (isNaN(parseInt(line.vals[1]))) {
      registers[line.vals[0]] *= registers[line.vals[1]];
    } else {
      registers[line.vals[0]] *= parseInt(line.vals[1]);
    }
  }
  // div a b - Divide the value of a by the value of b, truncate the result to an integer, then store the result in variable a. (Here, "truncate" means to round the value toward zero.)
  if (line.ins === "div") {
    if (isNaN(parseInt(line.vals[1]))) {
      registers[line.vals[0]] = Math.floor(
        registers[line.vals[0]] / registers[line.vals[1]]
      );
    } else {
      registers[line.vals[0]] = Math.floor(
        registers[line.vals[0]] / parseInt(line.vals[1])
      );
    }
  }
  // mod a b - Divide the value of a by the value of b, then store the remainder in variable a. (This is also called the modulo operation.)
  if (line.ins === "mod") {
    if (isNaN(parseInt(line.vals[1]))) {
      registers[line.vals[0]] =
        registers[line.vals[0]] % registers[line.vals[1]];
    } else {
      registers[line.vals[0]] =
        registers[line.vals[0]] % parseInt(line.vals[1]);
    }
  }
  // eql a b - If the value of a and b are equal, then store the value 1 in variable a. Otherwise, store the value 0 in variable a.
  if (line.ins === "eql") {
    if (isNaN(parseInt(line.vals[1]))) {
      registers[line.vals[0]] =
        registers[line.vals[0]] === registers[line.vals[1]] ? 1 : 0;
    } else {
      registers[line.vals[0]] =
        registers[line.vals[0]] === parseInt(line.vals[1]) ? 1 : 0;
    }
  }
};

const convertModelNumber = (modelNo: number) => {
  return modelNo
    .toString()
    .split("")
    .map((x) => parseInt(x))
    .reverse();
};

let maxModel = 0;
let testval: number[] = [];
for (let i = 34198111816300; i < 34198111816312; i++) {
  // for (let i = 99799212949999; i > 11111111111111; i--) {
  registers = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  testval = convertModelNumber(i);
  if (testval.indexOf(0) !== -1) continue;

  ipt.forEach((line) => {
    evaluate(line);
  });

  if (registers.z === 0) {
    maxModel = i;
    break;
  }
}

console.log(maxModel);
