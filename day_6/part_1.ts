// https://adventofcode.com/2024/day/6#part1

const START = "^";
const BLOCK = "#";
type Direction = "N" | "E" | "S" | "W";
type Cursor = { x: number; y: number };

function findNextPosition(d: Direction, c: Cursor): Cursor {
  switch (d) {
    case "N":
      return { x: c.x, y: c.y - 1 };
    case "E":
      return { x: c.x + 1, y: c.y };
    case "S":
      return { x: c.x, y: c.y + 1 };
    case "W":
      return { x: c.x - 1, y: c.y };
  }
}

function nextDirection(d: Direction): Direction {
  switch (d) {
    case "N":
      return "E";
    case "E":
      return "S";
    case "S":
      return "W";
    case "W":
      return "N";
  }
}

function isInBounds(c: Cursor, m: string[][]): boolean {
  return c.x >= 0 && c.x <= m[0].length - 1 && c.y >= 0 && c.y <= m.length - 1;
}

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_6/input.txt`);
  const lines = input.split("\n");
  const matrix: string[][] = [];
  for (const line of lines) {
    const x = line.split("");
    matrix.push(x);
  }

  const cursor: Cursor = { x: 0, y: 0 };
  const visitedPositions: Cursor[] = [];
  let init: boolean = false;
  let dir: Direction = "N";
  let complete: boolean = false;

  while (cursor.y <= matrix.length - 1) {
    if (!init) cursor.x = 0;
    while (cursor.x <= matrix[cursor.y].length - 1) {
      const curPos = matrix[cursor.y][cursor.x];

      // once we've found the start point, quit scanning
      if (curPos === START) {
        init = true;
        visitedPositions.push({ x: cursor.x, y: cursor.y });
      }

      if (init && !complete) {
        const nextPos = findNextPosition(dir, cursor);

        if (matrix[nextPos.y][nextPos.x] === BLOCK) {
          // if we found a block, change direction
          dir = nextDirection(dir);
        } else if (!isInBounds(nextPos, matrix)) {
          // if we're out of bounds, we're done
          complete = true;
        } else {
          // otherwise, keep walking
          cursor.x = nextPos.x;
          cursor.y = nextPos.y;
          visitedPositions.push(nextPos);
        }
      } else {
        cursor.x++; // if we haven't found the start point, keep scanning
      }
      if (complete) break;
    }
    if (!init) cursor.y++; // if we haven't found the start point, keep scanning
    if (complete) break;
  }

  // remove duplicates
  const uniquePositions = [
    ...new Set(visitedPositions.map((p) => JSON.stringify(p))),
  ];

  console.log(`Total unique positions visited: ${uniquePositions.length}`);
}
