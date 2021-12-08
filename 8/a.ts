export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => ({ signal: x.split(" | ")[0], out: x.split(" | ")[1] }))
  .map((x) => ({ signal: x.signal.split(" "), out: x.out.split(" ") }));

console.log(ipt);

let count = 0;
ipt.forEach((x) => {
  const lengths = x.out.map((x) => x.length);

  lengths.forEach((x) => {
    if ([2, 3, 4, 7].includes(x)) {
      count++;
    }
  });
});

console.log(count);
