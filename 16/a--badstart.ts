export {};

// const ipt = Deno.readTextFileSync("./input.txt").split("");

// const converted = ipt.reduce((collection: string, char) => {
//   return collection + parseInt(char, 16).toString(2).padStart(4, "0");
// }, "");

// const converted = "110100101111111000101000";
// const converted = "00111000000000000110111101000101001010010001001000000000";
const converted = "11101110000000001101010000001100100000100011000001100000";

const splitIdx = (value: string, index: number) => {
  return [value.substring(0, index), value.substring(index)];
};

let [cur, toParse] = splitIdx(converted, 6);
let byte: string;
let lTid: string;
let len: string;
let subCt: string;
let payload: string;

const pktArr: any[] = [];

let header = cur;

const parseNext = (payload: string) => {
  let [head, tP] = splitIdx(payload, 6);

  if (parseInt(splitIdx(head, 3)[1], 2) === 4) {
    [byte, tP] = splitIdx(tP, 5);
    const bytes: string[] = [];
    let length = 6;

    while (true) {
      length += 5;
      if (byte[0] === "0") {
        bytes.push(byte.slice(1));
        break;
      } else {
        bytes.push(byte.slice(1));
      }
      [byte, tP] = splitIdx(tP, 5);
    }

    const pkt = {
      v: parseInt(splitIdx(head, 3)[0], 2),
      t: parseInt(splitIdx(head, 3)[1], 2),
      bytes,
      val: parseInt(bytes.join(""), 2),
    };
    return { pkt, tP, length };
  }
};

const parseSub = (payload: string) => {
  const res = [];
  let [head, tP] = splitIdx(payload, 6);
  let c: string;

  while (tP.length) {
    if (parseInt(splitIdx(head, 3)[1], 2) === 4) {
      [byte, tP] = splitIdx(tP, 5);
      const bytes: string[] = [];
      let length = 6;

      while (true) {
        length += 5;
        if (byte[0] === "0") {
          bytes.push(byte.slice(1));
          break;
        } else {
          bytes.push(byte.slice(1));
        }
        [byte, tP] = splitIdx(tP, 5);
      }

      const pkt = {
        v: parseInt(splitIdx(head, 3)[0], 2),
        t: parseInt(splitIdx(head, 3)[1], 2),
        bytes,
        val: parseInt(bytes.join(""), 2),
      };
      res.push(pkt);
      if (tP.length > 6) {
        [c, tP] = splitIdx(tP, 6);
        head = c;
      } else tP = "";
    }
  }
  return res;
};

while (toParse.length) {
  if (parseInt(splitIdx(header, 3)[1], 2) === 4) {
    [byte, toParse] = splitIdx(toParse, 5);
    const bytes: string[] = [];
    let length = 6;

    while (true) {
      length += 5;
      if (byte[0] === "0") {
        //last byte
        bytes.push(byte.slice(1));
        break;
      } else {
        bytes.push(byte.slice(1));
      }
      [byte, toParse] = splitIdx(toParse, 5);
    }

    const pkt = {
      v: parseInt(splitIdx(header, 3)[0], 2),
      t: parseInt(splitIdx(header, 3)[1], 2),
      bytes,
      val: parseInt(bytes.join(""), 2),
    };
    pktArr.push(pkt);
    if (toParse.length > 6) {
      [cur, toParse] = splitIdx(toParse, 6);
      header = cur;
    } else toParse = "";
  } else {
    // Operator packet
    [lTid, toParse] = splitIdx(toParse, 1);

    if (lTid === "0") {
      // the next 15 bits are a number that represents the total length in bits
      [len, toParse] = splitIdx(toParse, 15);

      [payload, toParse] = splitIdx(toParse, parseInt(len, 2));

      const packets = parseSub(payload);

      const pkt = {
        v: parseInt(splitIdx(header, 3)[0], 2),
        t: parseInt(splitIdx(header, 3)[1], 2),
        packets,
      };
      pktArr.push(pkt);
      if (toParse.length > 6 && parseInt(toParse) !== 0)
        [header, toParse] = splitIdx(toParse, 6);
      else toParse = "";
    } else {
      // the next 11 bits are a number that represents the number of sub-packets
      [subCt, toParse] = splitIdx(toParse, 11);

      let counter = 0;

      const packets = [];
      let tP = toParse;
      let length = 6 + 1 + 11;
      while (counter < parseInt(subCt, 2)) {
        const t = parseNext(tP);
        packets.push(t!.pkt);
        tP = t!.tP;
        length += t!.length;
        counter++;
      }

      const pkt = {
        v: parseInt(splitIdx(header, 3)[0], 2),
        t: parseInt(splitIdx(header, 3)[1], 2),
        packets,
      };

      [cur, toParse] = splitIdx(toParse, length);

      pktArr.push(pkt);
      if (toParse.length > 6 && parseInt(toParse) !== 0)
        [header, toParse] = splitIdx(toParse, 6);
      else toParse = "";
    }
  }
}
console.log(pktArr[0]);
