console.log(d3)

var data = {}

async function main(geoID) {
  let groupsJSON = await d3.tsv('data/acs5.groups.txt')
  let groups = groupsJSON.map(d => d.B17015)

  let variablesJSON = await d3.json('data/variables.json')
  let variables = Object.keys(variablesJSON.variables)
  console.log(variables)
  variables = variables.sort().map(d => {
    let datum = variablesJSON.variables[d]
    datum.field = d
    return datum
  })
  let records = {}
  for (group of groups) {
    let rows
    try {
      rows = await d3.json(`data/${group}.json`)
      let headers = rows.shift()
      for (i in rows) {
        let row = _.zipObject(headers,rows[i])
        rows[i] = row
      }
      records[group] = rows

    } catch (error) {
      //
      console.log(error)
    }

  }

  console.log(records)
  console.log(variables)


groups.sort()

  data.groups = groups
  data.variables = variables

  console.log(groups)
}

