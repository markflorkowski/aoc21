export const a = "a";

const numbers = Deno.readTextFileSync("./input.txt")
  .split("\n")[0]
  .split(",")
  .map((x) => Number(x));

//console.log(numbers);

const boards = Deno.readTextFileSync("./input.txt")
  .split("\n\n")
  .slice(1)
  .map((bs) => bs.replace("  ", " ").split("\n"))
  .map((x) =>
    x.slice(0, 5).map((y) =>
      y
        .trim()
        .split(/[ ,]+/)
        .map((z) => {
          const value = parseInt(z, 10);
          return { value, called: false };
        })
    )
  );

//console.log(boards);

for (const num in numbers) {
  for (const board in boards) {
    //check if number is in board, mark it
    boards[board].forEach((row) => {
      row.forEach((item) => {
        if (item.value == numbers[num]) {
          item.called = true;
        }
      });
    });
    //check if they make a row
    for (const row in boards[board]) {
      if (
        boards[board][row].map((x) => x.called).filter((x) => x).length == 5
      ) {
        //won
        if (
          boards[board]
            .flat()
            .filter((x) => !x.called)
            .map((x) => x.value).length
        ) {
          console.log(
            boards[board]
              .flat()
              .filter((x) => !x.called)
              .map((x) => x.value)
              .reduce(
                (previousValue, currentValue) => previousValue + currentValue
              ) * numbers[num]
          );
          throw new Error();
        }
      }
    }
    // check if they make a col
    for (let i = 0; i < 5; i++) {
      if (
        boards[board][0][i].called &&
        boards[board][1][i].called &&
        boards[board][2][i].called &&
        boards[board][3][i].called &&
        boards[board][4][i].called &&
        true
      ) {
        //won
        if (
          boards[board]
            .flat()
            .filter((x) => !x.called)
            .map((x) => x.value).length
        ) {
          console.log(
            boards[board]
              .flat()
              .filter((x) => !x.called)
              .map((x) => x.value)
              .reduce(
                (previousValue, currentValue) => previousValue + currentValue
              ) * numbers[num]
          );
          throw new Error();
        }
      }
    }
  }
}
