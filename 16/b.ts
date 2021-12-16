export {};

const ipt = Deno.readTextFileSync("./input.txt").split("");

const inB = ipt.reduce((collection: string, char) => {
  return collection + parseInt(char, 16).toString(2).padStart(4, "0");
}, "");

let versionSum = 0;

const packetValue = (type: number, packets: number[]) => {
  if (type === 0) return packets.reduce((a, b) => a + b);
  if (type === 1) return packets.reduce((a, b) => a * b);
  if (type === 2) return packets.reduce((a, b) => Math.min(a, b));
  if (type === 3) return packets.reduce((a, b) => Math.max(a, b));
  if (type === 5) return packets[0] > packets[1] ? 1 : 0;
  if (type === 6) return packets[0] < packets[1] ? 1 : 0;
  if (type === 7) return packets[0] == packets[1] ? 1 : 0;
  return 0;
};

const parse = (bits: string) => {
  const version = parseInt(bits.slice(0, 3), 2);
  versionSum += version;

  const type = parseInt(bits.slice(3, 6), 2);

  // type 4 has no subpackets
  if (type === 4) {
    let idx = 6;
    let binary = "";
    while (bits[idx] === "1") {
      binary += bits.slice(idx + 1, idx + 5);
      idx += 5;
    }
    binary += bits.slice(idx + 1, idx + 5);
    return { idx: idx + 5, val: parseInt(binary, 2) };
  }

  // others have subpackets
  let currentIndex = 0;
  const valArr: number[] = [];
  const lType = bits[6];
  if (lType == "0") {
    // sum packets -- value is sum of subpackets
    // type 0 has packet length known
    const length = parseInt(bits.slice(7, 22), 2);
    let subPacketIndex = 0;
    //keep parsing packets until we reach the end
    while (subPacketIndex < length) {
      const temp = parse(bits.slice(subPacketIndex + 6 + 1 + 15));
      subPacketIndex += temp.idx;
      valArr.push(temp.val);
    }
    currentIndex = 6 + 1 + 15 + length;
  } else {
    //type 1 has packet count known
    const length = parseInt(bits.slice(7, 18), 2);
    let subPacketIndex = 6 + 1 + 11;

    for (let i = 0; i < length; i++) {
      const temp = parse(bits.slice(subPacketIndex));
      subPacketIndex += temp.idx;
      valArr.push(temp.val);
    }
    currentIndex = subPacketIndex;
  }

  return { idx: currentIndex, val: packetValue(type, valArr) };
};

console.log(parse(inB).val);
