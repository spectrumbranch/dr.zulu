var fs = require('fs')
  , async = require('async')
  , path = require('path')
  , colors = require('colors')
  , jsdiff = require('diff');;

var fixtures = {};
fixtures.generator = {};

fixtures.generator.model_index = [];

fixtures.util = {};


fixtures.util.displayDiff = function(first, second) {
    console.log();
    var diff = jsdiff.diffChars(first, second);

    diff.forEach(function(part){
        // green for additions, red for deletions
        // grey for common parts
        var color = part.added ? 'green' :
            part.removed ? 'red' : 'grey';
        
        var output;
        if (part.value == '\n') {
            output = '\\n\n'[color];
        } else {
            output = part.value[color];
        }
        process.stderr.write(output);
    });

    console.log();
}


fixtures.generator.initModelIndex = function(cb) {
    fs.readdir(path.resolve(__dirname, './model_index'), function(err, files) {
        if (err) throw err;
        var _files = files.filter(function(file) { return file != 'inputs'; }); 
        async.each(_files, function(file, done) {
            fs.readFile(path.resolve(__dirname, './model_index/' + file), function(readErr, modelIndexOutput) {
                if (readErr) throw readErr;
                fs.readFile(path.resolve(__dirname, './model_index/inputs/' + file), function(readErr2, modelIndexInput) {
                    if (readErr2) throw readErr2;
                    fixtures.generator.model_index.push({ name: file, input: JSON.parse(modelIndexInput), output: modelIndexOutput });
                    done();
                });
            });
        }, function(err) {
            cb(null, fixtures);
        });
    })
};


module.exports = fixtures;


