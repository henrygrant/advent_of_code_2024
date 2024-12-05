// https://adventofcode.com/2024/day/4#part1

const TARGET = "XMAS";

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

      if (matrix[cursor.y][cursor.x] === TARGET[0]) {
        let n: string = "";
        let ne: string = "";
        let e: string = "";
        let se: string = "";
        let s: string = "";
        let sw: string = "";
        let w: string = "";
        let nw: string = "";

        for (let i = 0; i < TARGET.length; i++) {
          if (cursor.y - i >= 0) {
            n = n.concat(matrix[cursor.y - i][cursor.x]);
          }

          if (cursor.y - i >= 0 && cursor.x + i < matrix[cursor.x].length) {
            ne = ne.concat(matrix[cursor.y - i][cursor.x + i]);
          }

          if (cursor.x + i < matrix[cursor.x].length) {
            e = e.concat(matrix[cursor.y][cursor.x + i]);
          }

          if (
            cursor.y + i < matrix[cursor.y].length &&
            cursor.x + i < matrix[cursor.x].length
          ) {
            se = se.concat(matrix[cursor.y + i][cursor.x + i]);
          }

          if (cursor.y + i < matrix[cursor.y].length) {
            s = s.concat(matrix[cursor.y + i][cursor.x]);
          }

          if (cursor.y + i < matrix[cursor.y].length && cursor.x - i >= 0) {
            sw = sw.concat(matrix[cursor.y + i][cursor.x - i]);
          }

          if (cursor.x - i >= 0) {
            w = w.concat(matrix[cursor.y][cursor.x - i]);
          }

          if (cursor.y - i >= 0 && cursor.x - i >= 0) {
            nw = nw.concat(matrix[cursor.y - i][cursor.x - i]);
          }
        }

        console.log(
          `n: ${n}, ne: ${ne}, e: ${e}, se: ${se}, s: ${s}, sw: ${sw}, w: ${w}, nw: ${nw}`
        );

        [n, ne, e, se, s, sw, w, nw].forEach((x) => x === TARGET && ret++);
      }
      cursor.x++;
    }
    cursor.y++;
  }
  console.log(ret);
}
