console.log(d3)

var data
var fields = ['state']
var variables
var geographies
var censusApiKey = '11f5493d2c1abfda99d1cda59e4d9c68a232adde'
var year = 2018

async function main(geoid) {
  if (variables == undefined) {
    variables = await d3.json('data/variables.json')
  }
  if (data == undefined) {
    data = await d3.csv('webData.csv')
  }
  console.log(data)


}

