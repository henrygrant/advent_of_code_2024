// https://adventofcode.com/2024/day/5#part1

interface RulesMap {
  [key: string]: number[];
}

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_5/input.txt`);
  const lines = input.split("\n");
  const idx = lines.indexOf("");
  const rulesRaw = lines.slice(0, idx);
  const updatesRaw = lines.slice(idx + 1, lines.length);

  // parse rules into map, where each key is a page number
  // and who's value is an array of pages that the initial
  // page should come before
  const rules: RulesMap = {};
  rulesRaw.forEach((r) => {
    const [before, after] = r.split("|").map((rr) => parseInt(rr));
    if (!(before in rules)) {
      rules[before] = [];
    }
    if (!rules[before].includes(after)) {
      rules[before].push(after);
    }
  });

  for (const entry in rules) {
    rules[entry].sort();
  }

  let sum = 0;
  updatesRaw.forEach((p) => {
    const updates = p.split(",").map((p) => parseInt(p));
    console.log(`presort: ${updates}`);
    const updatesSorted = [...updates];

    // for each update, create a sorted update according
    // to the rules
    updatesSorted.sort((a, b) => {
      if (a in rules && rules[`${a}`].includes(b)) {
        return -1;
      } else return 0;
    });

    console.log(`post-sort: ${updatesSorted}`);
    updatesSorted.forEach(
      (p) =>
        p in rules &&
        console.log(`   ${p}: ${rules[p].filter((r) => updates.includes(r))}`)
    );

    // if the original update matches the sorted update, the original update
    // is correct. It's middle value should be counted toward the sum
    if (updates.every((element, index) => element === updatesSorted[index])) {
      const middle = updates[Math.floor(updates.length / 2)];
      sum += middle;
      console.log(`middle: ${middle}`);
    } else {
      console.log(`not a match :(`);
    }
    console.log();
  });
  console.log(`sum of all passing middles: ${sum}`);
}
