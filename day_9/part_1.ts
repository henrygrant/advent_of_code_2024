function swapCharsInString(str: string, index1: number, index2: number) {
  const char1 = str[index1];
  const char2 = str[index2];
  str =
    str.slice(0, index1) +
    char2 +
    str.slice(index1 + 1, index2) +
    char1 +
    str.slice(index2 + 1);
  return str;
}

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_9/inputsmall.txt`);
  let str = "";

  console.log(`original:   ${input}`);

  for (let i = 0; i < input.length; i++) {
    const fileSize = parseInt(input[i * 2]);
    const freeSpace = parseInt(input[i * 2 + 1]);
    for (let j = 0; j < fileSize; j++) str += `${i}`;
    for (let j = 0; j < freeSpace; j++) str += ".";
  }
  console.log(`parsed:     ${str}`);

  const spaceUsed = str.replaceAll(".", "").length;
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === "." && i < spaceUsed) {
      for (let j = str.length - 1; j >= 0; j--) {
        if (str[j] !== ".") {
          str = swapCharsInString(str, i, j);
          console.log(`            ${str}`);
          break;
        }
      }
    }
  }
  console.log(`compressed: ${str}`);
  console.log();
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ".") {
      console.log(
        `   ${i} * ${str[i]} == ${i * parseInt(str[i])} | sum: ${sum}`
      );
      sum += i * parseInt(str[i]);
    }
  }
  console.log(sum);
}
