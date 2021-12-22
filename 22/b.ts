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
  })) as Inst[];

const getSubrange = (b: [number, number], c: [number, number]): number[] => {
  if (b[1] < c[0] || b[0] > c[1]) return [];
  return [Math.max(b[0], c[0]), Math.min(b[1], c[1])];
};

const countUninterrupted = (step: Inst, rest: Inst[]) => {
  const [xr, yr, zr] = step.range;

  const conflicts: Inst[] = [];

  for (let i = 0; i < rest.length; i++) {
    const [xr2, yr2, zr2] = rest[i].range;
    const cxr = getSubrange(xr2, xr);
    const cyr = getSubrange(yr2, yr);
    const czr = getSubrange(zr2, zr);

    if (cxr.length === 0 || cyr.length === 0 || czr.length === 0) continue;

    conflicts.push({
      cmd: rest[i].cmd,
      range: [cxr, cyr, czr] as [number, number][],
    });
  }

  let total = (xr[1] - xr[0] + 1) * (yr[1] - yr[0] + 1) * (zr[1] - zr[0] + 1);

  conflicts.forEach((step, idx) => {
    total -= countUninterrupted(step, conflicts.slice(idx + 1));
  });

  return total;
};

let count = 0;
ipt.forEach((step, idx) => {
  if (step.cmd === "off") return;
  count += countUninterrupted(step, ipt.slice(idx + 1));
});

console.log(count);
