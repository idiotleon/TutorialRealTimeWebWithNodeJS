function handleHTTP(req, res) {
    res.end("Hello World: " + Math.random());
}

var host = 'localhost';
var port = 8006;

var http = require("http");
var http_server = http
    .createServer(handleHTTP)
    .listen(port, host);

