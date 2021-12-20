export {};

const ipt = Deno.readTextFileSync("./input.txt").trim().split("\n\n");

const algo = ipt[0];

const im = ipt[1].split("\n");

const padImg = (img: string[], pad: number): string[] => {
  const padding = ".".repeat(pad);
  const p = ".".repeat(img[0].length + 2 * pad);
  const pArr = new Array(pad).fill(p);

  const newImg = img.map((r) => padding + r + padding);

  return [...pArr, ...newImg, ...pArr];
};

let fk = false;
const getPixelValue = (img: string[], x: number, y: number) => {
  let value = "";

  const d = fk ? "#" : ".";

  value += img[x - 1]?.[y - 1] ?? d;
  value += img[x - 1]?.[y] ?? d;
  value += img[x - 1]?.[y + 1] ?? d;

  value += img[x]?.[y - 1] ?? d;
  value += img[x]?.[y] ?? d;
  value += img[x]?.[y + 1] ?? d;

  value += img[x + 1]?.[y - 1] ?? d;
  value += img[x + 1]?.[y] ?? d;
  value += img[x + 1]?.[y + 1] ?? d;

  value = value.replaceAll(".", "0");
  value = value.replaceAll("#", "1");

  return parseInt(value, 2);
};

let ip = padImg(im, 50);
let i2: string[] = [];

let count = 0;
while (count < 50) {
  i2 = [];

  ip.forEach((r, x) => {
    i2.push(
      r
        .split("")
        .map((_, y) => algo[getPixelValue(ip, x, y)])
        .join("")
    );
  });
  fk = !fk;

  ip = i2;
  count++;
}

console.log(
  i2
    .join("")
    .split("")
    .filter((x) => x === "#").length
);
