// saveResults.js
const fs = require('fs');
const { Parser } = require('json2csv');

const saveToCSV = (trades, filename = 'results.csv') => {
  const parser = new Parser();
  const csv = parser.parse(trades);
  fs.writeFileSync(filename, csv);
}

module.exports = saveToCSV;