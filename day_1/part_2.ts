export function simulScore(a: number[], b: number[]): number {
  const simul: number[] = [];
  for (let i = 0; i < a.length; i++) {
    const occurances_in_b = b.filter((b) => b === a[i]).length;
    simul.push(a[i] * occurances_in_b);
  }
  const sum = simul.reduce((a, b) => a + b, 0);
  return sum;
}

if (import.meta.main) {
  const list1: number[] = [];
  const list2: number[] = [];
  const input = await Deno.readTextFile("input.txt");
  const lines = input.split("\n");
  for (const line of lines) {
    const [a, b] = line.split("   ");
    list1.push(parseInt(a));
    list2.push(parseInt(b));
  }
  console.log(simulScore(list1, list2));
}
