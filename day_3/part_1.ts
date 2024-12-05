// https://adventofcode.com/2024/day/3#part1

function filterGarbage(garb: string): string[] {
  const commandRegex = /mul\(\d+\,\d+\)/g;
  const matchItr = garb.matchAll(commandRegex);
  const matches: string[] = [];
  matchItr.forEach((match) => matches.push(match[0]));
  return matches;
}

function doMult(command: string): number {
  const numberRegex = /\d+/g;
  const matchItr = command.matchAll(numberRegex);
  const toMult: number[] = [];
  matchItr.forEach((match) => toMult.push(parseInt(match[0])));
  const result = toMult.reduce((a, b) => a * b, 1);
  return result;
}

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_3/input.txt`);
  const commands = filterGarbage(input);
  const results = commands.map(doMult);
  const sum = results.reduce((a, b) => a + b, 0);
  console.log(sum);
}
