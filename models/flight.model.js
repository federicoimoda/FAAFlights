const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FlightSchema = new Schema({
    _id: { type: Number, required: false},
    YEAR: { type: String, required: false},
    MONTH: { type: String, required: false },
    DAY: { type: String, required: false },
    DAY_OF_WEEK: { type: String, required: false },
    AIRLINE: { type: String, required: false },
    FLIGHT_NUMBER: { type: String, required: false },
    TAIL_NUMBER: { type: String, required: false },
    ORIGIN_AIRPORT: { type: String, required: false },
    DESTINATION_AIRPORT: { type: String, required: false },
    SCHEDULED_DEPARTURE: { type: String, required: false },
    DEPARTURE_TIME: { type: String, required: false },
    DEPARTURE_DELAY: { type: String, required: false },
    TAXI_OUT: { type: String, required: false },
    WHEELS_OFF: { type: String, required: false },
    SCHEDULED_TIME: { type: String, required: false },
    ELAPSED_TIME: { type: String, required: false },
    AIR_TIME: { type: String, required: false },
    DISTANCE: { type: String, required: false },
    WHEELS_ON: { type: String, required: false },
    TAXI_IN: { type: String, required: false },
    SCHEDULED_ARRIVAL: { type: String, required: false },
    ARRIVAL_TIME: { type: String, required: false },
    ARRIVAL_DELAY: { type: String, required: false },
    DIVERTED: { type: String, required: false },
    CANCELLED: { type: String, required: false },
    CANCELLATION_REASON: { type: String, required: false },
    AIR_SYSTEM_DELAY: { type: String, required: false },
    SECURITY_DELAY: { type: String, required: false },
    AIRLINE_DELAY: { type: String, required: false },
    LATE_AIRCRAFT_DELAY: { type: String, required: false },
    WEATHER_DELAY: { type: String, required: false }
});

module.exports = mongoose.model('Flight', FlightSchema);