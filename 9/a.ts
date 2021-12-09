export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split("").map((y) => parseInt(y)));

//console.log(ipt);

let sum = 0;
ipt.forEach((row, x) => {
  row.forEach((val, y) => {
    //corners
    if (x === 0 && y === 0) {
      if (val < ipt[x + 1][y] && val < ipt[x][y + 1]) {
        console.log(x, y, val);
        sum += val + 1;
      }
    } else if (x === ipt.length - 1 && y === row.length - 1) {
      if (val < ipt[x - 1][y] && val < ipt[x][y - 1]) {
        console.log(x, y, val);
        sum += val + 1;
      }
    } else if (x === 0 && y === row.length - 1) {
      if (val < ipt[x + 1][y] && val < ipt[x][y - 1]) {
        console.log(x, y, val);
        sum += val + 1;
      }
    } else if (x === ipt.length - 1 && y === 0) {
      if (val < ipt[x][y + 1] && val < ipt[x - 1][y]) {
        console.log(x, y, val);
        sum += val + 1;
      }
    }
    // edges
    //right
    else if (y === row.length - 1) {
      if (x === 0) {
        if (val < ipt[x + 1][y] && val < ipt[x][y - 1]) {
          console.log(x, y, val);
          sum += val + 1;
        }
      } else {
        if (val < ipt[x + 1][y] && val < ipt[x - 1][y] && val < ipt[x][y - 1]) {
          console.log(x, y, val);
          sum += val + 1;
        }
      }
    }
    //bottom
    else if (x === ipt.length - 1) {
      if (y === 0) {
        if (val < ipt[x - 1][y] && val < ipt[x][y + 1]) {
          console.log(x, y, val);
          sum += val + 1;
        }
      } else {
        if (val < ipt[x - 1][y] && val < ipt[x][y - 1] && val < ipt[x][y + 1]) {
          console.log(x, y, val);
          sum += val + 1;
        }
      }
    }
    //top
    else if (x === 0) {
      if (y === row.length - 1) {
        if (val < ipt[x + 1][y] && val < ipt[x][y - 1]) {
          console.log(x, y, val);
          sum += val + 1;
        }
      } else {
        if (val < ipt[x + 1][y] && val < ipt[x][y - 1] && val < ipt[x][y + 1]) {
          console.log(x, y, val);
          sum += val + 1;
        }
      }
    }
    //left
    else if (y === 0) {
      if (x === ipt.length - 1) {
        if (val < ipt[x - 1][y] && val < ipt[x][y + 1]) {
          console.log(x, y, val);
          sum += val + 1;
        }
      } else {
        if (val < ipt[x - 1][y] && val < ipt[x + 1][y] && val < ipt[x][y + 1]) {
          console.log(x, y, val);
          sum += val + 1;
        }
      }
    }
    //everything else
    else {
      if (
        val < ipt[x + 1][y] &&
        val < ipt[x - 1][y] &&
        val < ipt[x][y + 1] &&
        val < ipt[x][y - 1]
      ) {
        console.log(x, y, val);
        sum += val + 1;
      }
    }
  });
});

console.log("sum: ", sum);
