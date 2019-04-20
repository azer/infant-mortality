const readFile = require("fs").readFileSync
const writeFile = require("fs").writeFileSync
const regions = JSON.parse(readFile(process.argv[2]))
const selectedRegion = process.argv[3]

const scores = {}

findMostSimilarInHistoricalRange(2018, 1960)
  .slice()
  .forEach(region => console.log(region, scores[region]))

function findMostSimilarInHistoricalRange(from, to) {
  let year = from
  while (year-- > to) {
    const mostSimilarRegions = findSimilarRows(year).slice(0, 5)

    let i = -1
    while (++i < mostSimilarRegions.length) {
      const row = mostSimilarRegions[i]

      if (!scores[row.region]) scores[row.region] = 0
      scores[row.region] += 1
    }
  }

  return Object.keys(scores).sort((a, b) => {
    const scoreA = scores[a]
    const scoreB = scores[b]

    if (scoreA > scoreB) return -1
    if (scoreA < scoreB) return 1

    return 0
  })
}

function findSimilarRows(year) {
  const rows = []

  for (let region in regions) {
    if (region === selectedRegion) continue
    rows.push(getInfantMortality(region, year))
  }

  return rows.sort(sortBySimilarity(year))
}

function getInfantMortality(region, year) {
  return regions[region].find(row => row.year === year)
}

function sortBySimilarity(year) {
  const similarTo = getInfantMortality(selectedRegion, year)

  return function(a, b) {
    const diffA = Math.abs(a.estimate - similarTo.estimate)
    const diffB = Math.abs(b.estimate - similarTo.estimate)

    if (diffA > diffB) return 1
    if (diffA < diffB) return -1

    return 0
  }
}
