const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubscriptorSchema = new Schema({

    URI: { type: String, required: false},
    PORT: { type: String, required: false },
    CANT_POST: { type: String, required: false },
    NUM_REG: { type: String, required: false },
    OFFSET: { type: String, required: false },
    OFFSET_NEXT: { type: String, required: false }
});

module.exports = mongoose.model('Subscriptor', SubscriptorSchema);