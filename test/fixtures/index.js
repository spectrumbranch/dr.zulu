var fs = require('fs')
  , async = require('async')
  , path = require('path')
  , colors = require('colors')
  , jsdiff = require('diff');;

var fixtures = {};
fixtures.generator = {};



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

fixtures.generator.initGenerator = function(name, cb) {
    fs.readdir(path.resolve(__dirname, './' + name), function(err, files) {
        if (err) throw err;
        var _files = files.filter(function(file) { return file != 'inputs'; }); 
        
        fixtures.generator[name] = [];
        async.each(_files, function(file, done) {
            fs.readFile(path.resolve(__dirname, './' + name + '/' + file), function(readErr, output) {
                if (readErr) throw readErr;
                fs.readFile(path.resolve(__dirname, './' + name + '/inputs/' + file), function(readErr2, input) {
                    if (readErr2) throw readErr2;
                    fixtures.generator[name].push({ name: file, input: JSON.parse(input), output: output });
                    done();
                });
            });
        }, function(err) {
            cb(null, fixtures);
        });
    })
};

fixtures.generator.initModelIndex = function(cb) {
    fixtures.generator.initGenerator('model_index', function(err, fixtures) {
        cb(err, fixtures);
    });
};

fixtures.generator.initModel = function(cb) {
    fixtures.generator.initGenerator('model', function(err, fixtures) {
        cb(err, fixtures);
    });
};


module.exports = fixtures;


