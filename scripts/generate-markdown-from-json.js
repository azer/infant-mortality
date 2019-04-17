const readFile = require("fs").readFileSync

generate()

function generate() {
  const regions = JSON.parse(readFile(process.argv[2]))
  for (let region in regions) {
    console.log("# ", region)
    console.log("| Year | Estimate |")
    console.log("| ---- | -------- |")
    regions[region]
      .sort(sortByYear)
      .forEach(row => console.log("| %s | %s |", row.year, row.estimate))
  }
}

function sortByYear(a, b) {
  if (a.year > b.year) return -1
  if (a.year < b.year) return 1
  return 0
}
