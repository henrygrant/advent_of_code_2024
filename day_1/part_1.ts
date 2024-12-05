// https://adventofcode.com/2024/day/1#part1

function diffScore(a: number[], b: number[]): number {
  const sortedA = a.sort((a, b) => a - b);
  const sortedB = b.sort((a, b) => a - b);
  const distances: number[] = [];
  for (let i = 0; i < sortedA.length; i++) {
    distances.push(Math.abs(sortedA[i] - sortedB[i]));
  }
  const sum = distances.reduce((a, b) => a + b, 0);
  return sum;
}

if (import.meta.main) {
  const list1: number[] = [];
  const list2: number[] = [];
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_1/input.txt`);
  const lines = input.split("\n");
  for (const line of lines) {
    const [a, b] = line.split("   ");
    list1.push(parseInt(a));
    list2.push(parseInt(b));
  }
  console.log(diffScore(list1, list2));
}
