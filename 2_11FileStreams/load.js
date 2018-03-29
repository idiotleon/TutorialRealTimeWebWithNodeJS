#!/usr/bin/env node

function printHelp() {
    console.log("load.js (c) Leon");
    console.log("");
    console.log("usage:");
    console.log("--help         print this help");
    console.log("--file={NAME}      read the file of {NAME} and output");
    console.log("");
}

var args = require('minimist')(process.argv.slice(2), { string: "file" });

if (args.help || !args.file) {
    printHelp();
    process.exit(1);
}

var hello = require('./example_read_file_stream.js');

hello.say(args.file)
    .val(function (contents) {
        console.log(contents.toString());
    })
    .or(function (err) {
        console.error("Error: " + err);
    });