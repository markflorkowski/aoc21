export {};

const ipt = Deno.readTextFileSync("./input.txt");

const [xMin, xMax] = ipt
  .split(" ")[2]
  .slice(2)
  .split("..")
  .map((x) => parseInt(x));
const [yMin, yMax] = ipt
  .split(" ")[3]
  .slice(2)
  .split("..")
  .map((x) => parseInt(x));

const step = (xPos: number, yPos: number, xVel: number, yVel: number) => {
  // The probe's x position increases by its x velocity.
  xPos += xVel;
  // The probe's y position increases by its y velocity.
  yPos += yVel;
  // Due to drag, the probe's x velocity changes by 1 toward the value 0; that is, it decreases by 1 if it is greater than 0, increases by 1 if it is less than 0, or does not change if it is already 0.
  if (xVel > 0) xVel--;
  // Due to gravity, the probe's y velocity decreases by 1.
  yVel--;

  return [xPos, yPos, xVel, yVel];
};

const calcHit = (xPos: number, yPos: number) => {
  return xPos >= xMin && xPos <= xMax && yPos >= yMin && yPos <= yMax;
};

let maxYpos = 0;

for (let x = 0; x < xMax; x++) {
  for (let y = -1000; y < xMax * 100; y++) {
    let startXpos = 0;
    let startYpos = 0;
    let startXvel = x;
    let startYvel = y;

    let hit = false;
    let highest = 0;

    while (startXpos <= xMax && startYpos >= yMin) {
      [startXpos, startYpos, startXvel, startYvel] = step(
        startXpos,
        startYpos,
        startXvel,
        startYvel
      );

      if (startYpos > highest) highest = startYpos;

      if (calcHit(startXpos, startYpos)) {
        hit = true;
      }
    }

    if (hit && maxYpos < highest) maxYpos = highest;
  }
}

console.log(maxYpos);
