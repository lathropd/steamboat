
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

  let columns = data.columns.slice(1) // get everything but the name

