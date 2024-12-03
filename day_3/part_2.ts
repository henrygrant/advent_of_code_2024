const ANY_COMMAND_REGEX: RegExp = /(mul\(\d+\,\d+\))|(don\'t\(\))|(do\(\))/g;
const NUMBER_REGEX: RegExp = /\d+/g;
const MUL_COMMAND_REGEX: RegExp = /mul\(\d+\,\d+\)/;
const DO_COMMAND_REGEX: RegExp = /do\(\)/;
const DONT_COMMAND_REGEX: RegExp = /don\'t\(\)/;

function filterGarbage(garb: string): string[] {
  const matchItr = garb.matchAll(ANY_COMMAND_REGEX);
  const matches: string[] = [];
  matchItr.forEach((match) => matches.push(match[0]));
  return matches;
}

function doMult(command: string): number {
  const matchItr = command.matchAll(NUMBER_REGEX);
  const toMult: number[] = [];
  matchItr.forEach((match) => toMult.push(parseInt(match[0])));
  const result = toMult.reduce((a, b) => a * b, 1);
  return result;
}

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_3/input.txt`);
  const commands = filterGarbage(input);
  let exec: boolean = true;
  let ctr = 0;
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    if (DO_COMMAND_REGEX.test(command)) {
      exec = true;
    } else if (DONT_COMMAND_REGEX.test(command)) {
      exec = false;
    } else if (MUL_COMMAND_REGEX.test(command)) {
      if (exec) {
        const multed = doMult(command);
        ctr += multed;
      }
    }
  }
  console.log(ctr);
}
