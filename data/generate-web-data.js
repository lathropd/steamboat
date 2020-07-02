const fs = require('fs')
//const https = require('https')
const axios = require('axios')
const d3 = require('d3')


var fields = [
  'NAME',
  'STATE',
  'COUNTY',
  'B01001_001E',  // total population
  'B01001_002E',  // male population
  'B01001_026E',  // female population

  'B01001A_001E', // white population
  'B01001A_002E', // white male population
  'B01001A_017E', // white female population

  'B01001A_001E', // black population
  'B01001B_002E', // black male population
  'B01001A_017E', // black female population

  'B01001C_001E', // native american population
  'B01001C_002E', // native american male population
  'B01001C_017E', // native american female population

  'B01001D_001E', // asian population
  'B01001D_002E', // asian male population
  'B01001D_017E', // asian female population

  //'B01001E_001E', // native hawaiian / pacific islander population
  //'B01001E_002E', // native hawaiian / pacific islander male
  //'B01001E_017E', // native hawaiian / pacific islander female

  'B01001F_001E', // other race total
  'B01001F_002E', // other race male
  'B01001F_017E', // other race female

  'B01001G_001E', // two or more races total population
  'B01001G_002E', // two or more races total population
  'B01001G_017E', // two or more races female population

  'B01001H_001E', // white non-hispanic population
  'B01001H_002E', // white non-hispanic male population
  'B01001H_017E', // white non-hispanic female population

  'B01001I_001E', // hispanic (any race) population
  'B01001I_002E', // hispanic (any race) male population
  'B01001I_017E', // hispanic (any race) female population

  'B01002_001E',  // median age
  'B01002A_001E', // median age white
  'B01002B_001E', // median age black
  'B01002C_001E', // median age native american
  'B01002D_001E', // median age asian
  //'B01002E_001E', // median age native hawaiian and pacific islander
  'B01002F_001E', // median age other race
  'B01002G_001E', // median age two or more races
  'B01002H_001E', // median age non-hispanic white
  'B01002I_001E', // median age hispanic

  'B02008_001E',  // white alone or in combination population
  'B02009_001E',  // black alone or in combination population
  'B02010_001E',  // native american  alone or in combination population
  'B02011_001E',  // asian alone or in combination
  //'B02012_001E',  // hawaiian/pacific islander alone or in combination population
  'B02013_001E',  // other race alone or in combination population
  'B02018_008E',  // asian alone or in combination: filipino population

  'B03001_004E', // mexican population
  'B03001_005E', // puerto rican popultion
  'B03001_008E', // central american population
  'B03001_016E', // south american population

  'B03002_013E', // white alone hispanic
  'B03002_014E', // black alone hispanic
  'B03002_015E', // native american alone hispanic
  'B03002_016E', // asian hispanic alone hispanic
 // 'B03002_017E', // pacific islander alone hispanic
  'B03002_018E', // other race hispanic
  'B03002_019E', // two or more races hispanic

  'B05001_002E', // us born us citizens
  'B05001_003E', // us citizen born in puerto rico or US islands
  'B05001_004E', // us citizen born abroad to us parents
  'B05001_005E', // naturalized us citizen
  'B05001_006E', // not us citizen

  'B05002_003E', // born in the state of residence
  'B05006_124E', // born in latin america
  'B05006_139E', // born in mexico

  'B05010_001E', // children under 18
  'B05010_002E', // children under 18 below the poverty level
  'B05010_007E', // children uneer 18 living below the poverty level with single parent
  'B05010_010E', // children under 18 1.00 to 1.99 the poverty level
  'B05010_015E', // children under 18 1.00 to 1.99 the poverty level living with single parent

  'B05010_018E', // children under 18 2.00 and over the poervery level
  'B05010_023E', // children under 18 2.00 and over the poervery level living with single parent

  'B05011_002E', // not us citizen
  'B05011_003E', // naturalized citizen
  'B05011_004E', // naturalized 2015 or later
  'B05011_005E', // naturalized 2010 to 2014

  'B05012_003E', // foreign born
  'B05013_002E', // foreign born male
  'B05013_021E', // foreign born female

  'B06002_001E', // median age
  'B06002_002E', // median age born in state of residence
  'B06002_003E', // median age born in another state
  'B06002_005E', // median age foreign born


  'B06004A_002E', // born in state of residence (white)
  'B06004B_002E', // born in state of residence (black)
  'B06004C_002E', // born in state of residence (native american)
  'B06004D_002E', // born in state of residence (asian)
  //'B06004E_002E', // born in state of residence (pacific islander)
  'B06004F_002E', // born in state of residence (other race)
  'B06004G_002E', // born in state of residence (two or more races)
  'B06004H_002E', // born in state of residence (white nonhispanic)
  'B06004I_002E', // born in state of residence (hispanic)


  'B06008_002E', // never married
  'B06008_003E', // married, not separated
  'B06008_004E', // divorced
  'B06008_005E', // separated
  'B06008_006E', // widowed

  'B06009_003E', // high school graduate
  'B06009_004E', // some college/associates degree
  'B06009_005E', // bachelor's degree
  'B06009_006E', // graduate or professional degree

  // come back to B06009 for comparisons by in state/out of state/out of us


  'B06011_001E', // median income
  'B06011_002E', // ... born in state of residencec
  'B06011_003E', // ... born in another state
  'B06011_005E', // ... foreign born

  'B06012_001E', // population
  'B06012_002E', // below poverty line
  'B06012_003E', // 100 to 149% poverrty line
  'B06012_003E', // 150%+ the poverty line

  'B06012_018E', // foreign born below poverty level
  'B06012_019E', // foreign born 100 to 149% poverty level
  'B06012_020E', // foreign born at or above 150% poverty level


  'B07001_017E', // lived in current ourrent 1 year ago
  'B07001_018E', // ... 1 to 4 years
  'B07001_019E', // ... 5 to 17 years
  'B07001_020E', // ... 18 to 19 years
  // add more from b7001 for housing tenure
  // especially the same county







]
console.log(fields.length)
var apiKey = '11f5493d2c1abfda99d1cda59e4d9c68a232adde'


async function main() {
  let j = Math.ceil(fields.length/49,0)
  let datasets = []
  for (let i = 0; i  < j; i++) {
    let fieldsString = fields.slice(i*49,(i+1)*49).join(',')
    let geoIds = fs.readFileSync('./routt-and-moffat-geographies-querystring.txt', 'utf8')
    console.log(fieldsString)
    try {
      const resp = await axios.get('https://api.census.gov/data/2018/acs/acs5',
        { params: {
          get: fieldsString,
          key: apiKey,
          ucgid: geoIds.trim()
        }
      })
      console.log(resp.path)
      //console.log(resp)
      let rows = resp.data
      if(typeof(rows)=='string') {
        console.log(resp.status)
        console.log(resp.headers)
      } else {
        datasets.push(rows)
    }
    } catch (error) {
      console.log(error)
    }
  }
  let rows = datasets.shift()
  for (dataset of datasets) {
    for (i in dataset) {
      console.log(i)
      let oldRow = rows[i]
      oldRow.pop() // remove the trailing ucgid of the old row
      let newRow = dataset[i]
      rows[i] = oldRow.concat(newRow)
    }
  }

  let keys = rows[0].slice()
    for (k in keys) {
      console.log(k, '.')
      let denominatorKey = keys[k].split('_')[0] + '_001E'
      console.log(denominatorKey)
      let denominatorIndex = keys.indexOf(denominatorKey)
      let valueKey = keys[k].slice(0, keys[k].length - 1) + 'P'
      if (denominatorIndex > -1) {
        rows[0].push(valueKey)
        for  (i=1; i<rows.length; i++) {
          let row = rows[i].slice()
          let value = Math.round(row[k]/row[denominatorIndex] * 1000)/10 + '%'
          rows[i].push(value)
          process.stdout.write(':')

        }
      }
    }


  fs.writeFileSync(`webdata.csv`,d3.csvFormatRows(rows), {encoding:
    'utf8'})
  console.error('data downloaded')
}

main()

