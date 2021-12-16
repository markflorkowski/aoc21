export {};

const ipt = Deno.readTextFileSync("./input.txt").split("");

const inB = ipt.reduce((collection: string, char) => {
  return collection + parseInt(char, 16).toString(2).padStart(4, "0");
}, "");

let versionSum = 0;

const parse = (bits: string) => {
  const version = parseInt(bits.slice(0, 3), 2);
  versionSum += version;

  const type = parseInt(bits.slice(3, 6), 2);

  // type 4 has no subpackets
  if (type === 4) {
    let idx = 6;
    while (bits[idx] === "1") {
      idx += 5;
    }
    return idx + 5;
  }

  // others have subpackets
  let currentIndex = 0;
  const lType = bits[6];
  if (lType == "0") {
    // type 0 has packet length known
    const length = parseInt(bits.slice(7, 22), 2);

    //keep parsing packets until we reach the end
    while (currentIndex < length) {
      currentIndex += parse(bits.slice(currentIndex + 6 + 1 + 15));
    }
    currentIndex = 6 + 1 + 15 + length;
  } else {
    //type 1 has packet count known
    const length = parseInt(bits.slice(7, 18), 2);
    currentIndex = 6 + 1 + 11;
    for (let i = 0; i < length; i++) {
      currentIndex += parse(bits.slice(currentIndex));
    }
  }

  return currentIndex;
};

parse(inB);

console.log(versionSum);
