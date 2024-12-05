// https://adventofcode.com/2024/day/4#part2

const TARGET = "MAS";

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_4/input.txt`);
  const lines = input.split("\n");
  const matrix: string[][] = [];
  for (const line of lines) {
    const x = line.split("");
    matrix.push(x);
  }

  const cursor = { x: 0, y: 0 };
  let ret = 0;
  while (cursor.y <= matrix.length - 1) {
    cursor.x = 0;
    while (cursor.x <= matrix[cursor.y].length - 1) {
      console.log(cursor);

      if (matrix[cursor.y][cursor.x] === TARGET[1]) {
        let ne: string = "";
        let se: string = "";
        let sw: string = "";
        let nw: string = "";

        if (cursor.y - 1 >= 0 && cursor.x + 1 < matrix[cursor.x].length) {
          ne = ne.concat(matrix[cursor.y - 1][cursor.x + 1]);
        }

        if (
          cursor.y + 1 < matrix[cursor.y].length &&
          cursor.x + 1 < matrix[cursor.x].length
        ) {
          se = se.concat(matrix[cursor.y + 1][cursor.x + 1]);
        }

        if (cursor.y + 1 < matrix[cursor.y].length && cursor.x - 1 >= 0) {
          sw = sw.concat(matrix[cursor.y + 1][cursor.x - 1]);
        }

        if (cursor.y - 1 >= 0 && cursor.x - 1 >= 0) {
          nw = nw.concat(matrix[cursor.y - 1][cursor.x - 1]);
        }

        const acceptable = [TARGET, TARGET.split("").reverse().join("")];

        if (
          acceptable.includes(nw + TARGET[1] + se) &&
          acceptable.includes(ne + TARGET[1] + sw)
        ) {
          console.log(`ne: ${ne}, se: ${se}, sw: ${sw}, nw: ${nw}`);
          ret++;
        }
      }
      cursor.x++;
    }
    cursor.y++;
  }
  console.log(ret);
}
