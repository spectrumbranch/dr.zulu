var fs = require('fs')
  , async = require('async')
  , path = require('path');

var fixtures = {};
fixtures.generator = {};
fixtures.util = require('./util');




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

fixtures.generator.initLibraryIndex = function(cb) {
    fixtures.generator.initGenerator('library_index', function(err, fixtures) {
        cb(err, fixtures);
    });
};

fixtures.generator.initLibraryModule = function(cb) {
    fixtures.generator.initGenerator('library_module', function(err, fixtures) {
        cb(err, fixtures);
    });
};


module.exports = fixtures;


