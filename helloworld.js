function say(filename, cb) {
    return fs.readFile(filename, cb);
}

var fs = require("fs");

module.exports.say = say;