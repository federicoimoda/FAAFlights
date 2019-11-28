/*const csvjson = require('csvjson');
const readFile = require('fs').readFile;
var sub_service = require('./subscriber');
const csv = require('csv-parser');
const fs = require('fs');


//const inputFilePath = "../flights.csv";

exports.publish = function() {
    initFlight();
}

async function initFlight(){
  publishFlight();
}

async function publishFlight(){

  var i = 1;
  while (true) {
      console.log("Iteracion "+i)
      i++;

      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017/FAAFlightsDB";

      MongoClient.connect(url, function(err, db) {
        
          if (err) throw err;

          var dbo = db.db("FAAFlightsDB");
          dbo.collection("SubsFAAFlights").find({}).toArray(function(err, result) {
          
            if (err) throw err;

            result.forEach(function(sub){

              var data = new Array(); 

              fs.createReadStream('flights_part.csv')
              //falta filtrar por rango
              //fs.createReadStream('flights.csv', { start: 20, end: 50})
              //fs.createReadStream('flights.csv')
                .pipe(csv())
                .on('data', (row) => {
                  data.push(row);
                })
                .on('end', () => {

                      const http = require('http')
                     
                      const options = {
                        id: sub.id,
                        hostname: sub.uri,
                        port: sub.port,
                        path: '/api/Floghts',
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Content-Length': data.length
                        }
                      }

                      const req = http.request(options, res => {
                        console.log(`statusCode: ${res.statusCode}`)
                      
                        res.on('data', d => {
                          process.stdout.write(d)
                        })
                      })

                      req.on('error', error => {
                        console.error(error)
                      })

                      //Falta que itere los POSTs    

                      req.write(data)
                      req.end()

                      //Falta implementar la actualizacion del valor del offset

                      //var newOffset = q.offset + q.num_reg;
                      //var obj = {id:sub.id ,uri:sub.uri, port:sub.port, num_reg: sub.num_reg, offset: newOffset}

                      //sub_service.update(obj);

                      return new Promise(resolve=>{
                          setTimeout(resolve,100)
                      }); 

                });

          });
          db.close();
        });
      });
      await sleep(20000);  
  }

}

 function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    }); 
}

*/


const csvjson = require('csvjson');
const readFile = require('fs').readFile;
var sub_service = require('./subscriber');
const csv = require('csv-parser');
const fs = require('fs');


//const inputFilePath = "../flights.csv";

exports.publish = function() {
    initFlight();
}

async function initFlight(){
  publishFlight();
}

async function publishFlight(){

  var i = 1;
  while (true) {
      console.log("Iteracion "+i)
      i++;

      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017/FAAFlightsDB";

      MongoClient.connect(url, function(err, db) {
        
          if (err) throw err;

          var dbo = db.db("FAAFlightsDB");
          dbo.collection("SubsFAAFlights").find({}).toArray(function(err, result) {
          
            if (err) throw err;

            for (each in result){
                read = false;
                var data = new Array(); 
                fs.createReadStream('/Users/fimoda/Obligatorios/Arquitectura_Software/FAAFlights/Services/flights_part.csv')
                  .pipe(csv())
                  .on('data', (row) => {
                    //console.log('row:');
                    //console.log(row);
                    data.push(row);
                  })
                  .on('end', () => {
                        const http = require('http')
                        const options = {
                          hostname: result[each].uri,
                          port: parseInt(result[each].port, 10),
                          path: '/api/Flights',
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': data.length
                          }
                        }

                        const req = http.request(options, res => {
                          console.log(`statusCode: ${res.statusCode}`)
                        
                          res.on('data', d => {
                            //process.stdout.write(d)
                          })
                        })

                        req.on('error', error => {
                          console.log('Fefo puto');
                          console.error(error)
                        })

                        //Falta que itere los POSTs    
                        //console.log(data);

                        var data_new = new Array(); 
                        for (each in data){
                          data_new.push(
                              {                                              
                                "YEAR": data[each].YEAR,
                                "MONTH": data[each].MONTH,
                                "DAY": data[each].DAY,
                                "DAY_OF_WEEK": data[each].DAY_OF_WEEK,
                                "AIRLINE": data[each].AIRLINE,
                                "FLIGHT_NUMBER": data[each].FLIGHT_NUMBER,
                                "TAIL_NUMBER": data[each].TAIL_NUMBER,
                                "ORIGIN_AIRPORT": data[each].ORIGIN_AIRPORT,
                                "DESTINATION_AIRPORT": data[each].DESTINATION_AIRPORT,
                                "SCHEDULED_DEPARTURE": data[each].SCHEDULED_DEPARTURE,
                                "DEPARTURE_TIME": data[each].DEPARTURE_TIME,
                                "DEPARTURE_DELAY": data[each].DEPARTURE_DELAY,
                                "TAXI_OUT": data[each].TAXI_OUT,
                                "WHEELS_OFF": data[each].WHEELS_OFF,
                                "SCHEDULED_TIME": data[each].SCHEDULED_TIME,
                                "ELAPSED_TIME": data[each].ELAPSED_TIME,
                                "AIR_TIME": data[each].AIR_TIME,
                                "DISTANCE": data[each].DISTANCE,
                                "WHEELS_ON": data[each].WHEELS_ON,
                                "TAXI_IN": data[each].TAXI_IN,
                                "SCHEDULED_ARRIVAL": data[each].SCHEDULED_ARRIVAL,
                                "ARRIVAL_TIME": data[each].ARRIVAL_TIME,
                                "ARRIVAL_DELAY": data[each].ARRIVAL_DELAY,
                                "DIVERTED": data[each].DIVERTED,
                                "CANCELLED": data[each].CANCELLED,
                                "CANCELLATION_REASON": data[each].CANCELLATION_REASON,
                                "AIR_SYSTEM_DELAY": data[each].AIR_SYSTEM_DELAY,
                                "SECURITY_DELAY": data[each].SECURITY_DELAY,
                                "AIRLINE_DELAY": data[each].AIRLINE_DELAY,
                                "LATE_AIRCRAFT_DELAY": data[each].LATE_AIRCRAFT_DELAY,
                                "WEATHER_DELAY": data[each].WEATHER_DELAY
                          });
                        }  

                        console.log(JSON.stringify(data_new));
                        req.write('{YEAR:"2015"}');
                        req.end();
                        

                        //Falta implementar la actualizacion del valor del offset

                        //var newOffset = q.offset + q.num_reg;
                        //var obj = {id:sub.id ,uri:sub.uri, port:sub.port, num_reg: sub.num_reg, offset: newOffset}

                        //sub_service.update(obj);
                  });

            }
            

            /*
            result.forEach(function(sub){

              var data = new Array(); 

              fs.createReadStream('flights_part.csv')
              //falta filtrar por rango
              //fs.createReadStream('flights.csv', { start: 20, end: 50})
              //fs.createReadStream('flights.csv')
                .pipe(csv())
                .on('data', (row) => {
                  data.push(row);
                })
                .on('end', () => {

                      const http = require('http')
                     
                      const options = {
                        id: sub.id,
                        hostname: sub.uri,
                        port: sub.port,
                        path: '/api/Floghts',
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Content-Length': data.length
                        }
                      }

                      const req = http.request(options, res => {
                        console.log(`statusCode: ${res.statusCode}`)
                      
                        res.on('data', d => {
                          process.stdout.write(d)
                        })
                      })

                      req.on('error', error => {
                        console.error(error)
                      })

                      //Falta que itere los POSTs    

                      req.write(data)
                      req.end()

                      //Falta implementar la actualizacion del valor del offset

                      //var newOffset = q.offset + q.num_reg;
                      //var obj = {id:sub.id ,uri:sub.uri, port:sub.port, num_reg: sub.num_reg, offset: newOffset}

                      //sub_service.update(obj);

                      return new Promise(resolve=>{
                          setTimeout(resolve,100)
                      }); 

                });

          }); */
          db.close();
        });
      });
      await sleep(5000);  
  }

}

 function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    }); 
}
