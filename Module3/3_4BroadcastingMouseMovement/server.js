function handleHTTP(req, res) {
    if (req.method === "GET") {
        if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
            req.addListener("end", function () {
                req.url = req.url.replace(/^\/(\d+).*$/, "/$1.html");
                static_files.serve(req, res);
            });
            req.resume();
        } else if (req.url === "/jquery.js") {
            static_files.serve(req, res);
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

    socket.on("typeit", function (message) {
        // send the broadcast to everyone except the message sender himself
        socket.broadcast.emit('messages', message);

        // send the broadcast to everyone including the message sender himself
        // io.broadcast.emit('messages', message);
    });

    socket.on("spy", function (x, y) {
        socket.broadcast.emit("spy", {
            x: x,
            y: y
        });
    });

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