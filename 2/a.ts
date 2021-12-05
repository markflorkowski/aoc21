export const a = "a";

const ipt2a = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => ({ dir: x.split(" ")[0], amt: parseInt(x.split(" ")[1]) }));

let hpos = 0,
  vpos = 0;

ipt2a.forEach((cmd) => {
  switch (cmd.dir) {
    case "up":
      vpos -= cmd.amt;
      break;
    case "down":
      vpos += cmd.amt;
      break;
    case "forward":
      hpos += cmd.amt;
      break;
    case "backward":
      hpos -= cmd.amt;
      break;
  }
});

console.log(hpos * vpos);
