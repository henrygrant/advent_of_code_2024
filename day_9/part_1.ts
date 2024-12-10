// https://adventofcode.com/2024/day/9#part1

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

  const spaceUsed = arr.filter((a) => a !== ".").length;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === "." && i < spaceUsed) {
      for (let j = arr.length - 1; j >= 0; j--) {
        if (arr[j] !== ".") {
          const char1 = arr[i];
          const char2 = arr[j];
          arr[i] = char2;
          arr[j] = char1;
          // console.log(`            ${arr.join("")}`);
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
