var fs = require('fs')
  , path = require('path')
  , util = require('./util');

var internals = {};
internals.PROJECT_DIRECTORY = path.resolve(__dirname, '../projects');
  
//read lists of available projects
//load up project meta

internals.getProjects = function(cb) {
    var output = [{ name: '', id: 000000000000000000}];
    
    cb(null, output);
};

