var fs = require('fs')
  , path = require('path')
  , util = require('./util')
  , lockfile = require('lockfile'); //TODO

var internals = {};
internals.PROJECT_DIRECTORY = path.resolve(__dirname, '../projects');
internals.PROJECT_LIST_JSON_FILEPATH = path.resolve(internals.PROJECT_DIRECTORY, './projects.json');
internals.DEFAULT_PROJECT_LIST_DATA = [];
internals.PROJECT_LIST_LOCKFILE = internals.PROJECT_LIST_JSON_FILEPATH + '.lock'; //TODO
internals.PROJECT_LIST_LOCKFILE_OPTIONS = {}; //TODO
  
//read lists of available projects
//load up project meta




exports.getProjectList = internals.getProjectList = function(cb) {
    internals.readProjectListFile(function(err, data) {
        if (err) {
            internals.writeProjectListFile(null, function(err2, data2) {
                cb(err2, data2);
            });
        } else {
            cb(null, data);
        }
    });
};

internals.readProjectListFile = function(cb) {
    fs.readFile(internals.PROJECT_LIST_JSON_FILEPATH, function (err, data) {
        cb(err, data);
    });
};

internals.writeProjectListFile = function(input, cb) {
    var data = input && input.data ? input.data : internals.DEFAULT_PROJECT_LIST_DATA;
    lockfile.lock(internals.PROJECT_LIST_LOCKFILE, internals.PROJECT_LIST_LOCKFILE_OPTIONS, function(lockErr) {
        if (lockErr) {
            //lock didn't work, bubble error up and don't write the file
            cb(lockErr);
        } else {
            fs.writeFile(internals.PROJECT_LIST_JSON_FILEPATH, JSON.stringify(data), function(err) {
                lockfile.unlock(internals.PROJECT_LIST_LOCKFILE, function(unlockErr) {
                    if (unlockErr) {
                        console.log(unlockErr);
                    }
                    cb(err, data);
                });
            });
        }
    });
};

//TODO remove or use in cache mode
internals.getProjectList(function (err, data) {
    console.log(data.toString());
});
