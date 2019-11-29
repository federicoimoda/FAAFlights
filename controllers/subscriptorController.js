const Subscriptor = require('../models/subscriptor.model');


exports.subscriptor_delete = function (reg) {
    var subs = new Subscriptor(reg);
    subs.remove();
}

function subscriptor_delete (reg) {
    var subs = new Subscriptor(reg);
    subs.remove();
}

exports.subscriptor_deleteAll = async function () {
    const subs = await Subscriptor.find();
    for (each in subs) {
        subscriptor_delete(subs[each]);
    }
}

exports.subscriptor_deleteSome = async function (subs) {
    for (each in subs) {
        subscriptor_delete(subs[each]);
    }
}