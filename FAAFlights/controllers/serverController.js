const http = require('http');
const url = require('url');
const Subscriptor = require('../models/subscriptor.model');
const generic = require("../util/generic");
const config = require("../config");

exports.server_create = async function () {
    http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var q = url.parse(req.url, true).query;
        var obj = { URI: q.uri, PORT: q.port, CANT_POST: q.cant_post, NUM_REG: q.num_reg, OFFSET: q.offset, OFFSET_NEXT: q.offset }

        var subscriptor = new Subscriptor(obj);
        subscriptor.save();
        generic.log("Se ha ingresado un nuevo subscriptor.");
        res.end(JSON.stringify(obj));
    }).listen(config.port);
};