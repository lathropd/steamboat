//console.log(d3)

var data
var fields = ['state']
var variables
var geographies
var censusApiKey = '11f5493d2c1abfda99d1cda59e4d9c68a232adde'
var year = 2018

async function main(geoid) {
  if (variables == undefined) {
    variables = await d3.json('data/variables.json')
    variables = variables.variables
  }
  if (data == undefined) {
    data = await d3.csv('data/webdata.csv')
  }
  let acsVars = data.find(d => d.ucgid == geoid)
  console.log(acsVars)
  console.log(data.columns)
  // get the name of the geography
  let name = acsVars.NAME
  d3.selectAll('.geographyName').text(name)
  // get the column definitions
  let columns = data.columns.slice(1).sort() // get everything but the name
  let dataQuads = columns.map((d) => {
    if (variables[d]) {
      return [variables[d].concept, variables[d].label, acsVars[d],d]
    } else {
      return ['','',acsVars[d],d]
    }
  })

  //dataQuads = dataQuads.filter(d => d[2] != "")
  let table = d3.select('table#results tbody')

  table.selectAll("tr")
    .data(dataQuads)
    .join("tr")
    .selectAll("td")
    .data(d => d)
    .join("td")
    .text(d => d)
      //.selectAll("td")
      //.join("td")
      //.text(d => d)


}

