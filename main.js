const csv = require('csv');
const fs = require('fs');

const modelName = 'transaction'
const inputFile = 'input.csv'
const outputFile = 'output.json'

const output = []

fs.createReadStream(inputFile)
  .pipe(csv.parse({ delimiter: ',', from_line: 2 }))
  .on('data', (row) => {
    let obj = {
        "model": modelName,
        "model_id": row[0]
    }
    output.push(obj);        
  })
  .on('end', () => {
    fs.writeFile(outputFile, JSON.stringify(output, null, 2) + '\n', (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
  })
