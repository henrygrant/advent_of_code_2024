// https://adventofcode.com/2024/day/6#part2

const START = "^";
const BLOCK = "#";
type Direction = "N" | "E" | "S" | "W";
type Status = "incomplete" | "complete" | "stuck";
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

function findPotentialCandidates(matrix: string[][]): Cursor[] {
  const candidates: Cursor[] = [];

  const cursor: Cursor = { x: 0, y: 0 };
  while (cursor.y <= matrix.length - 1) {
    cursor.x = 0;
    while (cursor.x <= matrix[cursor.y].length - 1) {
      if (
        matrix[cursor.y][cursor.x] !== START &&
        matrix[cursor.y][cursor.x] !== BLOCK
      ) {
        candidates.push({ x: cursor.x, y: cursor.y });
      }
      cursor.x++;
    }
    cursor.y++;
  }
  return candidates;
}

function getStartingPosition(matrix: string[][]): Cursor {
  const cursor: Cursor = { x: 0, y: 0 };
  while (cursor.y <= matrix.length - 1) {
    cursor.x = 0;
    while (cursor.x <= matrix[cursor.y].length - 1) {
      if (matrix[cursor.y][cursor.x] === START) {
        return { x: cursor.x, y: cursor.y };
      }
      cursor.x++;
    }
    cursor.y++;
  }
  return cursor;
}

function runSimulation(matrix: string[][], override?: Cursor): Status {
  const cursor: Cursor = { x: 0, y: 0 };
  let dir: Direction = "N";
  let status: Status = "incomplete";

  const startPos = getStartingPosition(matrix);
  cursor.x = startPos.x;
  cursor.y = startPos.y;

  let itrs = 0;
  while (true) {
    itrs++;
    // not proud of the magic number
    if (itrs > 100000) {
      status = "stuck";
      break;
    }
    const nextPos = findNextPosition(dir, cursor);
    if (
      (isInBounds(nextPos, matrix) && matrix[nextPos.y][nextPos.x] === BLOCK) ||
      (override && override.x === nextPos.x && override.y === nextPos.y)
    ) {
      dir = nextDirection(dir);
    } else if (!isInBounds(nextPos, matrix)) {
      status = "complete";
      break;
    } else {
      cursor.x = nextPos.x;
      cursor.y = nextPos.y;
    }
  }
  return status;
}

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_6/input.txt`);
  const lines = input.split("\n");
  const matrix: string[][] = [];
  for (const line of lines) {
    const x = line.split("");
    matrix.push(x);
  }
  let sum = 0;
  const candidates = findPotentialCandidates(matrix);
  candidates.forEach((c) => {
    runSimulation(matrix, c) === "stuck" && sum++;
  });
  console.log(sum);
}
