
var http = require('http');
var url = require('url');
var sub = require('./Services/subscriber');
var pub = require('./Services/publish');

sub.drop();
sub.create();
pub.publish();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    var obj = {uri:q.uri, port:q.port, num_reg: q.num_reg, offset: q.offset}
    
    sub.save(obj);

    res.end(JSON.stringify(obj));
}).listen(8081);
