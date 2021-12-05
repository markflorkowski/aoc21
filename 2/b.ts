export const a = "a";

const ipt2b = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => ({ dir: x.split(" ")[0], amt: parseInt(x.split(" ")[1]) }));

let hposb = 0,
  vposb = 0,
  aim = 0;

ipt2b.forEach((cmd) => {
  switch (cmd.dir) {
    case "up":
      // vpos -= cmd.amt;
      aim -= cmd.amt;
      break;
    case "down":
      // vpos += cmd.amt;
      aim += cmd.amt;
      break;
    case "forward":
      hposb += cmd.amt;
      vposb += cmd.amt * aim;
      break;
    case "backward":
      hposb -= cmd.amt;
      break;
  }
});

console.log(hposb * vposb);
