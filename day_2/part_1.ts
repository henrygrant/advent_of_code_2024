export function numSafeReports(matrix: number[][]): number {
  let counter = 0;
  for (let i = 0; i < matrix.length; i++) {
    const report = matrix[i];
    if (
      (isAllAscending(report) || isAllDescending(report)) &&
      changeWithinBounds(report)
    ) {
      counter++;
    }
  }
  return counter;
}

function changeWithinBounds(report: number[]): boolean {
  for (let i = 0; i < report.length - 1; i++) {
    if (
      !(
        Math.abs(report[i + 1] - report[i]) >= 1 &&
        Math.abs(report[i + 1] - report[i]) <= 3
      )
    ) {
      return false;
    }
  }
  return true;
}

function isAllAscending(report: number[]): boolean {
  for (let i = 0; i < report.length - 1; i++) {
    if (report[i] >= report[i + 1]) {
      return false;
    }
  }
  return true;
}

function isAllDescending(report: number[]): boolean {
  for (let i = 0; i < report.length - 1; i++) {
    if (report[i] <= report[i + 1]) {
      return false;
    }
  }
  return true;
}

if (import.meta.main) {
  const matrix: number[][] = [];
  const input = await Deno.readTextFile("input.txt");
  const lines = input.split("\n");
  for (const line of lines) {
    const report = line.split(" ").map((l) => parseInt(l));
    matrix.push(report);
  }
  console.log(numSafeReports(matrix));
}
