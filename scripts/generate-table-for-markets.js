const readFile = require("fs").readFileSync
const regions = JSON.parse(readFile(process.argv[2]))

const developedMarkets = [
  "Australia",
  "Austria",
  "Belgium",
  "Canada",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Singapore",
  "Republic of Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States"
]

const emergingAndGrowingMarkets = [
  "Brazil",
  "China",
  "India",
  "Indonesia",
  "Mexico",
  "Russia",
  "Turkey"
]

const g7 = [
  "Canada",
  "France",
  "Germany",
  "Italy",
  "United Kingdom",
  "United States"
]

const g20 = [
  "Australia",
  "Canada",
  "Saudi Arabia",
  "United States",
  "India",
  "Russia",
  "South Africa",
  "Turkey",
  "Argentina",
  "Brazil",
  "Mexico",
  "France",
  "Germany",
  "Italy",
  "United Kingdom",
  "China",
  "Indonesia",
  "Japan",
  "Republic of Korea"
]

generate(g20)

function generate(selectedRegions) {
  console.log(`| Year | ${selectedRegions.join(" | ")} |`)
  console.log(`| --- | ${selectedRegions.map(r => "---").join(" | ")} |`)

  let year = 2018
  while (year-- > 1980) {
    const cols = selectedRegions
      .map(region => `${getInfantMortality(region, year)}`)
      .join(" | ")
    console.log(`| ${year} | ${cols} |`)
  }
}

function getInfantMortality(region, year) {
  return regions[region].find(row => row.year === year).estimate
}
