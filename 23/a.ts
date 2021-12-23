export {};

import memoizy from "https://deno.land/x/memoizy/mod.ts";

const part1 = [
  ["C", "B"],
  ["A", "A"],
  ["D", "B"],
  ["D", "C"],
];
const part2 = [
  ["C", "D", "D", "B"],
  ["A", "C", "B", "A"],
  ["D", "B", "A", "B"],
  ["D", "A", "C", "C"],
];

const countOcc = (arr: string[], val: string) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

const f = (lines: string[][]) => {
  const roomMap = [2, 4, 6, 8];
  const hallSpots = [0, 1, 3, 5, 7, 9, 10];
  const destination: { [key: string]: number } = { A: 0, B: 1, C: 2, D: 3 };
  const costs: { [key: string]: number } = { A: 1, B: 10, C: 100, D: 1000 };
  const roomSize = lines[0].length;
  const hallwayStart: string[] = new Array(11).fill("");

  const helper = (hallway: string[], rooms: string[][]) => {
    if (
      JSON.stringify(rooms) ===
      JSON.stringify([
        new Array(roomSize).fill("A"),
        new Array(roomSize).fill("B"),
        new Array(roomSize).fill("C"),
        new Array(roomSize).fill("D"),
      ])
    )
      return 0;

    let bestCost = Infinity;

    // Move from the hallway into a room.
    hallway.forEach((square: string, i) => {
      if (square === "") return;

      const dest = destination[square];
      let canMove = rooms[dest].every((roommate) => {
        return roommate === "" || roommate === square; // can only move to room with like roommate, or empty
      });

      if (!canMove) return;

      const offset = roomMap[dest] > i ? 1 : -1;

      for (let j = i + offset; j < roomMap[dest] + offset; j += offset) {
        if (hallway[j] !== "") {
          canMove = false;
          break;
        }
      }

      if (!canMove) return;

      const emptyCount = countOcc(rooms[dest], "");

      const newRoom = [
        ...new Array(emptyCount - 1 < 0 ? 0 : emptyCount - 1).fill(""),
        ...new Array(roomSize - emptyCount + 1).fill(square),
      ];

      const steps = emptyCount + Math.abs(i - roomMap[dest]);
      const cost = steps * costs[square];

      const helperCost = memoHelper(
        [...hallway.slice(0, i), "", ...hallway.slice(i + 1)],
        [...rooms.slice(0, dest), newRoom, ...rooms.slice(dest + 1)]
      );

      const newCost = cost + helperCost;

      if (newCost < bestCost) bestCost = newCost;
    });

    // Move from a room into the hallway.
    rooms.forEach((room, i) => {
      let wantToMove = false;

      room.forEach((e) => {
        if (e !== "" && destination[e] !== i) wantToMove = true;
      });

      if (!wantToMove) return;

      const emptyCount = countOcc(room, "");
      const steps = emptyCount + 1;
      const square = room[emptyCount];

      hallSpots.forEach((hall_destination) => {
        const destSteps = steps + Math.abs(hall_destination - roomMap[i]);
        const destCost = destSteps * costs[square];

        let blocked = false;
        for (
          let j = Math.min(hall_destination, roomMap[i]);
          j < Math.max(hall_destination, roomMap[i]) + 1;
          j++
        ) {
          if (hallway[j] !== "") {
            blocked = true;
            break;
          }
        }

        if (blocked) return;

        const newRoom = [
          ...new Array(emptyCount + 1).fill(""),
          ...room.slice(emptyCount + 1),
        ];

        const helperCost = memoHelper(
          [
            ...hallway.slice(0, hall_destination),
            square,
            ...hallway.slice(hall_destination + 1),
          ],
          [...rooms.slice(0, i), newRoom, ...rooms.slice(i + 1)]
        );

        const newCost = destCost + helperCost;

        if (newCost < bestCost) bestCost = newCost;
      });
    });

    return bestCost;
  };
  const memoHelper = memoizy(helper);
  return memoHelper(hallwayStart, lines);
};

console.log("part1: ", f(part1));

console.log("part2: ", f(part2));
