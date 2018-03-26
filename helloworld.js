function say(filename, cb) {
    return fs.readFile(filename, function (err, contents) {
        if (err) {
            cb(err);
        } else {
            // The program waits 1s before it prints out the result
            setTimeout(function () {
                // no error to be passed
                cb(null, contents);
            }, 1000);
        }
    });
}

var fs = require("fs");

module.exports.say = say;