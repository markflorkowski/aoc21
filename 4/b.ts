export const a = "a";

const numbers2 = Deno.readTextFileSync("./input.txt")
  .split("\n")[0]
  .split(",")
  .map((x) => Number(x));

//console.log(numbers2);

const boards2 = Deno.readTextFileSync("./input.txt")
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

// console.log(boards2);

const score = (board: typeof boards2[number], lastcalled: number) => {
  return (
    board
      .flat()
      .filter((x) => !x.called)
      .map((x) => x.value)
      .reduce((previousValue, currentValue) => previousValue + currentValue) *
    lastcalled
  );
};

const won = (board: typeof boards2[number]) => {
  //check if they make a row
  for (const row in board) {
    if (board[row].filter((x) => x.called).length === 5) {
      //won
      if (
        board
          .flat()
          .filter((x) => !x.called)
          .map((x) => x.value).length
      ) {
        return true;
      }
    }
  }
  // check if they make a col
  for (let i = 0; i < 5; i++) {
    if (
      board[0][i].called &&
      board[1][i].called &&
      board[2][i].called &&
      board[3][i].called &&
      board[4][i].called
    ) {
      //won
      if (
        board
          .flat()
          .filter((x) => !x.called)
          .map((x) => x.value).length
      ) {
        return true;
      }
    }
  }
  return false;
};

let i = 0;

let singleLoserIndex = -1;
let lastcalled = -1;

while (boards2.filter((board) => won(board)).length !== boards2.length) {
  if (boards2.filter((board) => !won(board)).length === 1) {
    singleLoserIndex = boards2.findIndex((board) => !won(board));
    lastcalled = numbers2[i];
  }
  for (const board in boards2) {
    //check if number is in board, mark it
    boards2[board].forEach((row) => {
      row.forEach((item) => {
        if (item.value == numbers2[i]) {
          item.called = true;
        }
      });
    });
  }
  i++;
}

console.log(score(boards2[singleLoserIndex], lastcalled));
