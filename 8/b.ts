const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => ({ signal: x.split(" | ")[0], out: x.split(" | ")[1] }))
  .map((x) => ({ signal: x.signal.split(" "), out: x.out.split(" ") }));

//console.log(ipt);

let sum = 0;
ipt.forEach((x) => {
  const lengths = x.signal.map((x) => x.length);

  const segments: string[][] = [[], [], [], [], [], [], [], [], [], []];

  lengths.forEach((y, i) => {
    if ([2].includes(y)) {
      segments[1].push(...x.signal[i].split(""));
    }
    if ([3].includes(y)) {
      segments[7].push(...x.signal[i].split(""));
    }
    if ([4].includes(y)) {
      segments[4].push(...x.signal[i].split(""));
    }
    if ([7].includes(y)) {
      segments[8].push(...x.signal[i].split(""));
    }
  });

  const top = segments[7].filter((x) => !segments[1].includes(x));

  // 5 and 6
  const topL = segments[4].filter((x) => !segments[1].includes(x));

  // 2 and 6
  const botL = segments[8].filter((x) => ![...top, ...segments[4]].includes(x));

  const checker = (arr: string[], target: string[]) =>
    target.every((v) => arr.includes(v));

  lengths.forEach((y, i) => {
    if ([6].includes(y)) {
      if (checker(x.signal[i].split(""), topL)) {
        if (checker(x.signal[i].split(""), botL)) {
          segments[6].push(...x.signal[i].split(""));
        } else {
          segments[9].push(...x.signal[i].split(""));
        }
      } else {
        segments[0].push(...x.signal[i].split(""));
      }
    }
    if ([5].includes(y)) {
      if (checker(x.signal[i].split(""), botL)) {
        segments[2].push(...x.signal[i].split(""));
      } else if (checker(x.signal[i].split(""), topL)) {
        segments[5].push(...x.signal[i].split(""));
      } else {
        segments[3].push(...x.signal[i].split(""));
      }
    }
  });
  const srt = function (text: string) {
    return text.split("").sort().join("");
  };

  const segs = segments.map((seg) => srt(seg.join("")));

  console.log(
    "sig:",
    x.signal.map((cc) => srt(cc))
  );
  console.log("seg:", segs);

  sum += parseInt(
    x.out
      .map((sss) => srt(sss))
      .map((dd) => segs.indexOf(dd))
      .join("")
  );
});

console.log(sum);
