var fs = require('fs')
  , path = require('path')
  , util = require('./util')
  , lockfile = require('lockfile'); //TODO

var internals = {};
internals._DEBUG_MODE = true;

internals.PROJECT_DIRECTORY = path.resolve(__dirname, '../projects');
internals.PROJECT_LIST_JSON_FILEPATH = path.resolve(internals.PROJECT_DIRECTORY, './projects.json');
internals.DEFAULT_PROJECT_LIST_DATA = [];
internals.DEFAULT_PROJECT_NAME = 'NEW PROJECT';
internals.PROJECT_LIST_LOCKFILE = internals.PROJECT_LIST_JSON_FILEPATH + '.lock'; //TODO
internals.PROJECT_LIST_LOCKFILE_OPTIONS = {}; //TODO
  
//read lists of available projects
//load up project meta

internals.log = function(msg) {
    if (internals._DEBUG_MODE) {
        console.log('[projects] ', msg);
    }
};

exports.createNewProject = internals.createNewProject = function(input, cb) {
    var projectName = input && input.name ? input.name : internals.DEFAULT_PROJECT_NAME;
    var newID = util.generateNewProjectId();
    var project = { id: newID, name: projectName };
    
    internals.appendToProjectListFile(project, function(err, data) {
        cb(err, data);
    });
};


exports.getProjectList = internals.getProjectList = function(cb) {
    internals.readProjectListFile(function(err, data) {
        if (err) {
            internals.log('project list not found, writing new');
            internals.writeProjectListFile(null, function(err2, data2) {
                cb(err2, data2);
            });
        } else {
            internals.log('project list found with contents: ' + JSON.stringify(data));
            cb(null, data);
        }
    });
};

internals.readProjectListFile = function(cb) {
    fs.readFile(internals.PROJECT_LIST_JSON_FILEPATH, function (err, data) {
        if (!err) {
            data = util.parseJSON(data);
        }
        cb(err, data);
    });
};


internals.appendToProjectListFile = function(project, cb) {
    internals.getProjectList(function(err, data) {
        var projectList = { data: data };
        projectList.data.push(project);
        internals.writeProjectListFile(projectList, function(err2, data2) {
            var output = null;
            if (!err2) {
                output = project;
            }
            cb(err2, output);
        });
    });
};

//overwrites whole file
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
                        internals.log(unlockErr);
                    }
                    cb(err, data);
                });
            });
        }
    });
};


//TODO remove or use in cache mode
internals.getProjectList(function (err, data) {
    //console.log(data.toString());
});
