// https://adventofcode.com/2024/day/11#part1s

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_11/input.txt`);
  // console.log(input);
  let stones = input.split(" ");
  const times = 25;
  for (let i = 0; i < times; i++) {
    stones = stones
      .map((stone) => {
        if (stone === "0") {
          return "1";
        } else if (stone.length % 2 === 0) {
          return [
            stone.substring(0, stone.length / 2),
            `${parseInt(stone.substring(stone.length / 2))}`,
          ];
        } else {
          return `${parseInt(stone) * 2024}`;
        }
      })
      .flat();
    console.log(`times: ${i} | len: ${stones.length}`);
  }
}
