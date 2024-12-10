// https://adventofcode.com/2024/day/8#part2

interface Coord {
  x: number;
  y: number;
}

interface EntryMap {
  [key: string]: Coord[];
}

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_8/input.txt`);
  const ignoredChars = [".", "\n"];
  const freqs = [...new Set(input)].filter((ch) => !ignoredChars.includes(ch));
  const rows = input.split("\n");
  const map: EntryMap = {};
  const antinodes: Coord[] = [];

  // find towers
  rows.forEach((row, y) => {
    row.split("").forEach((ch, x) => {
      if (freqs.includes(ch)) {
        if (!(ch in map)) {
          map[ch] = [];
        }
        map[ch].push({ x, y });
      }
    });
  });

  // for each kind of frequency tower
  freqs.forEach((freq) => {
    const towers = map[freq];

    // find all possible pairs of towers
    for (const t1 of towers) {
      for (const t2 of towers) {
        if (!antinodes.some((an) => an.x === t2.x && an.y === t2.y)) {
          antinodes.push(t2);
        }

        if (t1.x === t2.x && t1.y === t2.y) {
          continue;
        }
        // get distance between towers
        const ogRise = t2.y - t1.y;
        const ogRun = t2.x - t1.x;
        let rise = ogRise;
        let run = ogRun;

        while (true) {
          const antinode = { x: t2.x + run, y: t2.y + rise };

          // if new antinode is in bounds
          if (
            antinode.x >= 0 &&
            antinode.y >= 0 &&
            antinode.x < rows[0].length &&
            antinode.y < rows.length
          ) {
            // if new antinode isn't already known
            if (
              !antinodes.some(
                (an) => an.x === antinode.x && an.y === antinode.y
              )
            ) {
              // add to the list
              antinodes.push(antinode);
            }
            // reloop for _resonant harmonics_
            rise = rise += ogRise;
            run = run += ogRun;
          } else {
            break;
          }
        }
      }
    }
  });

  // // illustrate
  // rows.forEach((row, y) => {
  //   Deno.stdout.writeSync(new TextEncoder().encode("\n"));
  //   row.split("").forEach((ch, x) => {
  //     if (ch === "." && antinodes.some((an) => an.x === x && an.y === y)) {
  //       Deno.stdout.writeSync(new TextEncoder().encode("#"));
  //     } else {
  //       Deno.stdout.writeSync(new TextEncoder().encode(ch));
  //     }
  //   });
  // });
  // console.log();
  // // data
  // console.log(map);
  console.log(antinodes.length);
}
