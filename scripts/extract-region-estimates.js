const readFile = require("fs").readFileSync

function extract() {
  const regions = {}

  readFile(process.argv[2])
    .toString()
    .split("\n")
    .filter(row => row.indexOf("Infant mortality rate") !== -1)
    .filter(row => row.indexOf('"Total"') !== -1)
    .filter(row => row.indexOf("UN IGME estimate") !== -1)
    .forEach(row => {
      const cols = row.split(",")
      const region = cols[0].replace(/"/g, "")
      const year = Number(cols[10].replace(/"/g, "").replace(/-\d+$/, ""))
      const estimate = Number(cols[11].replace(/"/g, ""))

      if (!regions[region]) {
        regions[region] = []
      }

      regions[region].push({
        region,
        year,
        estimate
      })
    })

  return regions
}

console.log(JSON.stringify(extract(), null, "\t"))
