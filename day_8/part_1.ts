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
        if (t1.x === t2.x && t1.y === t2.y) {
          continue;
        }
        // get distance between towers
        const rise = t2.y - t1.y;
        const run = t2.x - t1.x;

        // get antinode based on same distance
        const antinode = { x: t2.x + run, y: t2.y + rise };

        // check if antinode is in bounds and not already known
        if (
          !antinodes.some((an) => an.x === antinode.x && an.y === antinode.y) &&
          antinode.x >= 0 &&
          antinode.y >= 0 &&
          antinode.x < rows[0].length &&
          antinode.y < rows.length
        ) {
          antinodes.push(antinode);
        }
      }
    }
  });

  console.log(antinodes.length);
}
