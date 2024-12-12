// https://adventofcode.com/2024/day/11#part2

// credit to Trevor Konya for helping me with this one: https://github.com/tkonya

type Shortcuts = {
  [key: number]: {
    [key: number]: number;
  };
};
const shortcuts: Shortcuts = {};

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_11/input.txt`);
  const stones = input.split(" ");
  const blinks = 75;

  let totalStones = 0;

  stones.forEach((stone) => (totalStones += blink(parseInt(stone), blinks)));

  console.log(totalStones);
}

function checkShortcut(num: number, blinksLeft: number): number {
  if (shortcuts[blinksLeft]) {
    if (shortcuts[blinksLeft][num]) {
      return shortcuts[blinksLeft][num];
    }
  }
  return -1;
}

function writeShortcut(num: number, blinksLeft: number, result: number): void {
  if (!shortcuts[blinksLeft]) {
    shortcuts[blinksLeft] = {};
  }
  shortcuts[blinksLeft][num] = result;
}

function blink(num: number, blinksLeft: number): number {
  if (blinksLeft == 0) {
    return 1;
  }
  const check = checkShortcut(num, blinksLeft);
  if (check > -1) {
    return check;
  }

  let calculatedResult: number;

  if (num == 0) {
    calculatedResult = blink(1, blinksLeft - 1);
  } else if (`${num}`.length % 2 == 0) {
    const leftNum = parseInt(`${num}`.substring(0, `${num}`.length / 2));
    const rightNum = parseInt(`${num}`.substring(`${num}`.length / 2));
    calculatedResult =
      blink(leftNum, blinksLeft - 1) + blink(rightNum, blinksLeft - 1);
  } else {
    calculatedResult = blink(num * 2024, blinksLeft - 1);
  }

  writeShortcut(num, blinksLeft, calculatedResult);
  return calculatedResult;
}
