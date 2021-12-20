import { permutations } from "https://deno.land/std@0.117.0/collections/mod.ts";

type Point = [number, number, number];

type Transform = {
  axis: 0 | 1 | 2;
  sign: -1 | 1;
};

const ipt = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n\n")
  .map((x) => {
    const beacons = x
      .split("\n")
      .slice(1)
      .map((l) => l.split(",").map((part) => parseInt(part)) as Point);
    return {
      beacons,
      distances: beacons.map((b1) =>
        beacons.map((b2) => {
          return Math.sqrt(
            (b1[0] - b2[0]) ** 2 + (b1[1] - b2[1]) ** 2 + (b1[2] - b2[2]) ** 2
          );
        })
      ),
    };
  });

const allTransforms: Transform[][] = (
  permutations([0, 1, 2]) as [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2][]
).flatMap(([x, y, z]) => [
  [
    { axis: x, sign: 1 },
    { axis: y, sign: 1 },
    { axis: z, sign: 1 },
  ],
  [
    { axis: x, sign: 1 },
    { axis: y, sign: 1 },
    { axis: z, sign: -1 },
  ],
  [
    { axis: x, sign: 1 },
    { axis: y, sign: -1 },
    { axis: z, sign: 1 },
  ],
  [
    { axis: x, sign: 1 },
    { axis: y, sign: -1 },
    { axis: z, sign: -1 },
  ],
  [
    { axis: x, sign: -1 },
    { axis: y, sign: 1 },
    { axis: z, sign: 1 },
  ],
  [
    { axis: x, sign: -1 },
    { axis: y, sign: 1 },
    { axis: z, sign: -1 },
  ],
  [
    { axis: x, sign: -1 },
    { axis: y, sign: -1 },
    { axis: z, sign: 1 },
  ],
  [
    { axis: x, sign: -1 },
    { axis: y, sign: -1 },
    { axis: z, sign: -1 },
  ],
]);

const offsets: { axes: Transform[]; offset: Point }[] = new Array(ipt.length);
offsets[0] = { axes: allTransforms[0], offset: [0, 0, 0] };

const overlaps = (d1: number[][], d2: number[][]) => {
  const found: number[][] = [];
  d1.forEach((a1, i1) => {
    d2.forEach((a2, i2) => {
      if (a1.filter((value) => a2.includes(value)).length >= 12) {
        found.push([i1, i2]);
      }
    });
  });
  return found;
};

const allOverlaps = ipt.map((s1) =>
  ipt.map((s2) => (s1 === s2 ? [] : overlaps(s1.distances, s2.distances)))
);

const neighbors = allOverlaps.map((c) =>
  c.map((matches, i) => (matches.length >= 12 ? i : 0)).filter((n) => n !== 0)
);

const transform = (t: Transform[], p: Point): Point => {
  return t.map(({ sign, axis }) => p[axis] * sign) as Point;
};

const toVisit: number[][] = neighbors[0].map((n) => [0, n]);
while (toVisit.length > 0) {
  const [p1, p2] = toVisit.shift()!;
  if (offsets[p2] !== undefined) continue;

  const p1Transform = offsets[p1]!.axes;
  const overlaps = allOverlaps[p1][p2];
  const candidates: [number, Point][] = allTransforms.map((t) => {
    const ds = overlaps.map(([p1L, p2L]) => {
      const b1 = transform(p1Transform, ipt[p1].beacons[p1L]);
      const b2 = transform(t, ipt[p2].beacons[p2L]);
      return b1.map((n, i) => n - b2[i]) as Point;
    });
    return [
      ds.filter(
        (elt) =>
          elt[0] === ds[0][0] && elt[1] === ds[0][1] && elt[2] === ds[0][2]
      ).length,
      ds[0],
    ];
  });
  const candidate = candidates.findIndex(([b]) => b === overlaps.length);
  offsets[p2] = {
    axes: allTransforms[candidate],
    offset: candidates[candidate][1].map(
      (n, idx) => n + offsets[p1]!.offset[idx]
    ) as Point,
  };
  toVisit.push(...neighbors[p2].map((n) => [p2, n]));
}

const allBeacons = new Set<string>();
ipt.forEach(({ beacons }, i) => {
  const { offset, axes } = offsets[i]!;
  beacons.forEach((b) => {
    allBeacons.add(
      transform(axes, b)
        .map((a, i) => [a, offset[i]])
        .map(([i, j]) => i + j)
        .join(",")
    );
  });
});
console.log("a:", allBeacons.size);

const allManhattan = offsets.flatMap((b1) =>
  offsets.map(
    (b2) =>
      Math.abs(b1!.offset[0] - b2!.offset[0]) +
      Math.abs(b1!.offset[1] - b2!.offset[1]) +
      Math.abs(b1!.offset[2] - b2!.offset[2])
  )
);
console.log(
  "b:",
  allManhattan.reduce((acc, n) => (acc > n ? acc : n), -Infinity)
);
