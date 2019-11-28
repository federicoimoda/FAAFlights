const data = require('./data/fileReaderAndLoad');
const flight = require('./controllers/flightController');
const subs = require('./controllers/subscriptorController');
const server = require('./controllers/serverController');
const db = require('./controllers/dbController');
const config = require('./config');


var app = async function (){

    db.initDataBase();

    //await flight.showCount_Flights();

    if(config.flight_delete) { await flight.flight_deleteAll() };
    if(config.loadFlights) { await data.loadData() };
    
    await subs.subscriptor_deleteAll();
    
    server.server_create();
    
    flight.publishFlight();

}

app();