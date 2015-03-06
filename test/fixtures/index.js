var fs = require('fs')
  , async = require('async')
  , path = require('path');

var fixtures = {};
fixtures.generator = {};

fixtures.generator.model_index = [];






fixtures.generator.initModelIndex = function(cb) {
    fs.readdir(path.resolve(__dirname, './model_index'), function(err, files) {
        if (err) throw err;
        var _files = files.filter(function(file) { return file != 'inputs'; }); 
        async.each(_files, function(file, done) {
            fs.readFile('./model_index/' + file, function(readErr, modelIndexOutput) {
                if (readErr) throw readErr;
                fs.readFile(path.resolve(__dirname, './model_index/inputs/' + file), function(readErr2, modelIndexInput) {
                    if (readErr2) throw readErr2;
                    fixtures.generator.model_index.push({ name: file, input: modelIndexInput, output: modelIndexOutput });
                    done();
                });
            });
        }, function(err) {
            cb(null, fixtures);
        });
    })
};


module.exports = fixtures;


