export {};

type Inst = {
  cmd: "on" | "off";
  range: [number, number][];
};

const ipt = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .map((x) => ({
    cmd: x.split(" ")[0],
    range: x
      .split(" ")[1]
      .split(",")
      .map((y) =>
        y
          .split("=")[1]
          .split("..")
          .map((z) => parseInt(z))
      ),
  }));

const cubeMap = new Map<string, boolean>();

const setNodesForStep = (step: Inst) => {
  let [xMin, xMax] = step.range[0];
  let [yMin, yMax] = step.range[1];
  let [zMin, zMax] = step.range[2];

  if (xMin < -50) xMin = -50;
  if (xMax > 50) xMax = 50;
  if (yMin < -50) yMin = -50;
  if (yMax > 50) yMax = 50;
  if (zMin < -50) zMin = -50;
  if (zMax > 50) zMax = 50;

  for (let x = xMin; x <= xMax; x++) {
    for (let y = yMin; y <= yMax; y++) {
      for (let z = zMin; z <= zMax; z++) {
        cubeMap.set(`${x},${y},${z}`, step.cmd === "on");
      }
    }
  }
};

let i = 0;
while (i < ipt.length) {
  setNodesForStep(ipt[i] as Inst);
  i++;
}

console.log([...cubeMap.values()].filter((x) => x === true).length);
