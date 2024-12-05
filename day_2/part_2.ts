// https://adventofcode.com/2024/day/2#part2

function numSafeReports(matrix: number[][]): number {
  let counter = 0;
  for (let i = 0; i < matrix.length; i++) {
    const report = matrix[i];
    if (reportIsSafe(report)) {
      counter++;
    } else {
      for (let j = 0; j < report.length; j++) {
        const reportCopy = [...report];
        reportCopy.splice(j, 1);
        if (reportIsSafe(reportCopy)) {
          counter++;
          break;
        }
      }
    }
  }
  return counter;
}

function reportIsSafe(report: number[]): boolean {
  return (
    (isAllAscending(report) || isAllDescending(report)) &&
    changeWithinBounds(report)
  );
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
  const input = await Deno.readTextFile(`${Deno.cwd()}/day_2/input.txt`);
  const lines = input.split("\n");
  for (const line of lines) {
    const report = line.split(" ").map((l) => parseInt(l));
    matrix.push(report);
  }
  console.log(numSafeReports(matrix));
}
