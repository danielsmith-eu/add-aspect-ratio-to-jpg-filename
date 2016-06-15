'use strict';
var im = require('imagemagick');
var fs = require('fs');

var filenames = process.argv.splice(2);
if (filenames.length === 0) {
    console.log("Usage: node add-ratio.js [file] [file] [file]");
    process.exit();
}

var sizes = {
    1: "1-1_Square_(wrong)",
    1.3: "4-3_Wide_(wrong)",
    1.4: "6-4_Photo",
    1.5: "7-5_Large_Photo"
};

var left = filenames.length;
var wrongFound = false;
var results = {};

filenames.forEach(function (filename) {
    im.readMetadata(filename, function(err, metadata){
        if (err) { throw err; }

        var w = metadata.exif.exifImageWidth;
        var h = metadata.exif.exifImageLength;

        var ratio = w > h ? w/h : h/w;
        ratio = Math.round( ratio * 10 ) / 10;

        var size = sizes[ratio];
        if (size.indexOf("wrong") > -1) {
            wrongFound = true;
        }
        results[filename] = size;
        console.log(filename + "\t" + size);
        if (--left === 0) {
            done();
        }
    });
});

function splitExt(fn) {
    var lastDot = fn.lastIndexOf(".");
    return [fn.slice(0, lastDot), fn.slice(lastDot)];
}

function done() {
    if (!wrongFound) {
        console.log("All OK - renaming");
        Object.keys(results).forEach(function (filename){
            var size = results[filename];
            var exts = splitExt(filename);
            var newName = exts[0] + "-" + size + exts[1];
            fs.rename(filename, newName);
        });
    } else {
        console.log("Some wrong aspect ratio photos found, fix and rerun.");
    }
}