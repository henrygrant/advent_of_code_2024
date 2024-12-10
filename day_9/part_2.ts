// https://adventofcode.com/2024/day/9#part2

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_9/input.txt`);
  const arr: string[] = [];

  // console.log(`original:   ${input}`);

  for (let i = 0; i < input.length; i++) {
    const fileSize = parseInt(input[i * 2]);
    const freeSpace = parseInt(input[i * 2 + 1]);
    for (let j = 0; j < fileSize; j++) arr.push(`${i}`);
    for (let j = 0; j < freeSpace; j++) arr.push(".");
  }
  // console.log(`parsed:     ${arr.join("")}`);

  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== ".") {
      const blockIdxs: number[] = [];
      for (let j = i; j >= 0; j--) {
        if (arr[j] == arr[i]) {
          blockIdxs.push(j);
        } else {
          // console.log(
          //   `i: ${i} | val: ${arr[i]} | blockIdxs: ${JSON.stringify(blockIdxs)}`
          // );
          // console.log(`compressed: ${arr.join("")}`);

          for (let k = 0; k < i; k++) {
            if (arr[k] === ".") {
              let dotBlockIdxs: number[] = [];
              for (let l = k; l < arr.length; l++) {
                if (arr[l] === arr[k]) {
                  dotBlockIdxs.push(l);
                } else {
                  if (blockIdxs.length <= dotBlockIdxs.length) {
                    for (let m = 0; m < blockIdxs.length; m++) {
                      if (blockIdxs[m] > dotBlockIdxs[m]) {
                        const ch = arr[blockIdxs[m]];
                        arr[blockIdxs[m]] = arr[dotBlockIdxs[m]];
                        arr[dotBlockIdxs[m]] = ch;
                      }
                    }
                    break;
                  } else {
                    dotBlockIdxs = [];
                  }
                }
              }
            }
          }

          i = j + 1;
          break;
        }
      }
    }
  }

  // console.log(`compressed: ${arr.join("")}`);
  // console.log();
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== ".") {
      // console.log(
      //   `   ${i} * ${arr[i]} == ${i * parseInt(arr[i])} | sum: ${sum}`
      // );
      sum += i * parseInt(arr[i]);
    }
  }
  console.log(sum);
}

// 00...111...2...333.44.5555.6666.777.888899
// 0099.111...2...333.44.5555.6666.777.8888..
// 0099.1117772...333.44.5555.6666.....8888..
// 0099.111777244.333....5555.6666.....8888..
// 00992111777.44.333....5555.6666.....8888..
