const http = require('http');
const Flight = require('../models/flight.model');
const Subscriptor = require('../models/subscriptor.model');
const Sub = require('../controllers/subscriptorController');
const generic = require("../util/generic");

exports.flight_create = function (reg) {
    var flight = new Flight(reg);
    flight.save();
}

exports.flight_delete = function (reg) {
    var flight = new Flight(reg);
    flight.remove();
}

function flight_delete (reg) {
    var flight = new Flight(reg);
    flight.remove();
}

exports.flight_deleteSome = function (regs) {
    for (each in regs) {
        flight_delete(regs[each]);
    }
}

exports.flight_deleteAll = async function () {
    var flights = await Flight.find();
    for (each in flights) {
        flight_delete(flights[each]);
    }
}

exports.publishFlight = async function () {

    while (true) {
        generic.log("Nueva iteracion en curso.");
        var subs_ready = new Array();
        const subs = await Subscriptor.find();

        if (subs.length > 0) {
            for (each in subs) {

                var cant_post = parseInt(subs[each].CANT_POST, 10);
                var num_reg_post = parseInt(subs[each].NUM_REG, 10);
                var offset = parseInt(subs[each].OFFSET_NEXT, 10);
                var offset_ini = parseInt(subs[each].OFFSET, 10);

                if (offset < (offset_ini + (num_reg_post * cant_post))) {
                    var end = offset + (num_reg_post * cant_post) - 1;

                    const flights = await Flight.find({ _id: { $gte: offset, $lte: end } });

                    for (var i = 0; i < cant_post; i++) {

                        var data = new Array();
                        for (var j = offset - 1; (j < (offset + num_reg_post - 1) && j < flights.length); j++) {
                            data.push(flights[j]);
                        }

                        data = JSON.stringify(data);
                        const options = {
                            hostname: subs[each].URI,
                            port: parseInt(subs[each].PORT, 10),
                            path: '/api/Flights',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Content-Length': data.length
                            }
                        }

                        const req = http.request(options);  

                        req.on('error', error => {
                            generic.log("Problemas con Subscriptor: " + subs[each].URI + ":" + subs[each].PORT);
                        })

                        req.write(data);
                        req.end();
                        offset = offset + num_reg_post;
                    }

                    subs[each].OFFSET_NEXT = offset;
                    await subs[each].save();
                } else {
                    generic.log("A Suscriptor " + subs[each].URI + ":" + subs[each].PORT + " sele enviaron todos los datos.");
                    subs_ready.push(subs[each]);
                }

            }
            
        }else{
            generic.log("No hay Suscriptores para enviar datos.");
        }

        await Sub.subscriptor_deleteSome(subs_ready);
        generic.log("Esperando para una nueva iteracion...");
        await generic.sleep(5000);
    }
}
