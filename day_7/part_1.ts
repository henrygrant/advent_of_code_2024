interface EntryMap {
  [key: string]: number[];
}

const getPermutations = (tot: number, ops: string[]): string[] => {
  const ret: string[] = [];
  const total = ops.length ** tot;
  for (let i = 0; i < total; i++) {
    const numStr = i.toString(ops.length).padStart(tot, "0");
    const convStr = numStr
      .split("")
      .map((char) => ops[parseInt(char)])
      .join("");
    ret.push(convStr);
  }
  return ret;
};

const doMath = (op: string, a: number, b: number): number => {
  let ret: number = 0;
  switch (op) {
    case "*":
      ret = a * b;
      break;
    case "+":
      ret = a + b;
      break;
  }
  return ret;
};

if (import.meta.main) {
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_7/input.txt`);
  const lines = input.split("\n");
  const map: EntryMap = {};

  const OPS = ["*", "+"];
  for (const line of lines) {
    const [testValRaw, numsRaw] = line.split(":");
    const nums = numsRaw
      .split(" ")
      .filter((n) => n)
      .map((n) => parseInt(n));
    if (testValRaw in map) {
      console.log(testValRaw);
    }
    map[testValRaw] = nums;
  }
  let sum = 0;
  for (const key in map) {
    const nums = map[key];
    const perms = getPermutations(nums.length - 1, OPS);

    for (const perm of perms) {
      let mathResult = nums[0];
      for (let i = 0; i < nums.length - 1; i++) {
        mathResult = doMath(perm[i], mathResult, nums[i + 1]);
      }
      if (mathResult === parseInt(key)) {
        sum += parseInt(key);
        break;
      }
    }
  }
  console.log(sum);
}
