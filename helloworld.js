function say(filename) {
    return fs.readFileSync(filename);
}

var fs = require("fs");

module.exports.say = say;