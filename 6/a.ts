export const a = "a";

const ipt = Deno.readTextFileSync("./input.txt")
  .split(",")
  .map((x) => parseInt(x));

//console.log(ipt);

const age = (list: number[]) => {
  const newlist: number[] = [];

  list.forEach((fish) => {
    if (fish > 0) {
      newlist.push(fish - 1);
    }
    if (fish == 0) {
      newlist.push(6);
      newlist.push(8);
    }
  });

  return newlist;
};

let cur = ipt;
let days = 80;
for (let i = 0; i < days; i++) {
  cur = age(cur);
}

console.log(cur.length);
