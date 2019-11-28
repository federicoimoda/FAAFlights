const csv = require("csv-parser");
const fs = require("fs");
const gen = require("../util/generic");
const config = require("../config");
const flight_controller = require("../controllers/flightController");

var idVuelo = config.startIdFlight;

var inputFilePath = "";

exports.loadData = async function () {

    if(config.load_test_data){
        inputFilePath = config.inputFilePath_test;
    }else{
        inputFilePath = config.inputFilePath_prod;
    }

    if (config.load_data) {
        var i = idVuelo;
        startLog();
        fs.createReadStream(inputFilePath)
            .pipe(csv())
            .on('data', (row) => {
                row._id = i;
                flight_controller.flight_create(row);
                i++;
            })
            .on('end', () => {
                endLog();
            });
    }
}

function startLog() {

    gen.log("Comienza lectura archivo");
    gen.logTime();
    gen.log("Leyendo archivo y Cargando Base de Datos...");
}

function endLog() {

    gen.log("Fin de lectura de archivo");
    gen.logTime();
    gen.log("Carga exitosa");

}