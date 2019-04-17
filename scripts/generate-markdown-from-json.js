const readFile = require("fs").readFileSync
const writeFile = require("fs").writeFileSync

generate()

function generate() {
  const regions = JSON.parse(readFile(process.argv[2]))

  for (let region in regions) {
    const filename = `./markdown/regions/${region}.md`

    const buf = []
    buf.push(`# ${region}`)
    buf.push("")
    buf.push("| Year | Estimate |")
    buf.push("| ---- | -------- |")
    regions[region]
      .sort(sortByYear)
      .forEach(row => buf.push(`| ${row.year} | ${row.estimate} |`))

    console.log("Writing %s", region)
    writeFile(filename, buf.join("\n"))
  }
}

function sortByYear(a, b) {
  if (a.year > b.year) return -1
  if (a.year < b.year) return 1
  return 0
}
