// https://adventofcode.com/2024/day/10#part1

interface Coord {
  x: number;
  y: number;
}

function isInBounds(coord: Coord, map: number[][]): boolean {
  const { x, y } = coord;
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

function hike(map: number[][], coord: Coord): number {
  const left = { x: coord.x - 1, y: coord.y };
  const right = { x: coord.x + 1, y: coord.y };
  const up = { x: coord.x, y: coord.y - 1 };
  const down = { x: coord.x, y: coord.y + 1 };
  let ret = 0;
  // let str = "";
  // for (let i = 0; i < map[coord.y][coord.x]; i++) {
  //   str = str.concat(".");
  // }
  // console.log(
  //   `${str} coord: ${coord.x}, ${coord.y}, val: ${map[coord.y][coord.x]}`
  // );
  if (map[coord.y][coord.x] === 9) {
    return 1;
  } else {
    if (
      isInBounds(left, map) &&
      map[left.y][left.x] === map[coord.y][coord.x] + 1
    ) {
      ret += hike(map, left);
    }
    if (
      isInBounds(right, map) &&
      map[right.y][right.x] === map[coord.y][coord.x] + 1
    ) {
      ret += hike(map, right);
    }
    if (isInBounds(up, map) && map[up.y][up.x] === map[coord.y][coord.x] + 1) {
      ret += hike(map, up);
    }
    if (
      isInBounds(down, map) &&
      map[down.y][down.x] === map[coord.y][coord.x] + 1
    ) {
      ret += hike(map, down);
    }
    return ret;
  }
}

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_10/input.txt`);
  const lines = input.split("\n");
  const map: number[][] = [];

  lines.forEach((line) => map.push(line.split("").map((l) => parseInt(l))));

  // lines.forEach((line) => console.log(line));

  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "0") {
        sum += hike(map, { x: j, y: i });
      }
    }
  }
  console.log(sum);
}
