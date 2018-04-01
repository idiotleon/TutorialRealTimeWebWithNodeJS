function handleHTTP(req, res) {
    if (req.method == "GET") {
        if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
            req.addListener("end", function () {
                req.url = req.url.replace(/^\/(\d+).*$/, "/$1.html");
                static_files.serve(req, res);
            });
            req.resume();
        } else {
            res.writeHead(403);
            res.end("Get outta here!");
        }
    } else {
        res.writeHead(403);
        res.end("Get outta here!");
    }
}

function handleIO(socket) {
    function disconnect() {
        clearInterval(interval);
        console.log("client disconnected");
    }

    console.log("client connected");
    socket.on("disconnect", disconnect);

    var interval = setInterval(function () {
        socket.emit("hello", Math.random());
    }, 1000);
}

var host = 'localhost';
var port = 8006;

var http = require('http');
var http_server = http
    .createServer(handleHTTP)
    .listen(port, host);

var node_static = require('node-static');
var static_files = new node_static.Server(__dirname);

var io = require("socket.io").listen(http_server);

io.on("connection", handleIO);

io.configure(function () {
    io.enable("browser client minification");   // send minification
    io.enable("browser client etag");   // apply etag caching
    io.set("log level", 1); // reduce logging
    io.set("transports", [
        "websockets",
        "xhr-polling",
        "jsonp-polling"
    ]);
});