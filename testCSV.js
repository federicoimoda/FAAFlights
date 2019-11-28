const csv = require('csv-parser');
const fs = require('fs');

var jsonObj = new Array(); 


console.log('Cargando Vuelos...');
fs.createReadStream('flights_part.csv')
//fs.createReadStream('flights.csv', { start: 20, end: 50})
//fs.createReadStream('flights.csv')
  .pipe(csv())
  .on('data', (row) => {

    jsonObj.push(row);
  })
  .on('end', () => {

    console.log('Vuelos cargados satisfactoriamente.');
    console.log(jsonObj);
    

  });