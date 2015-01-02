var uuid = require('node-uuid')
  , fs = require('fs')
  , lockfile = require('lockfile')  //TODO
  , assert = require('assert');

var internals = {};
internals._DEBUG_MODE = true;
internals.log = function(msg) {
    if (internals._DEBUG_MODE) {
        console.log('[util] ', msg);
    }
};
  
exports.generateNewProjectId = function() {
    return uuid.v4();
}

//try / catch handling with expected null if error
//intended to allow optimization of functions that need to parse json
exports.parseJSON = function(json) {
    var output;
    try {
        output = JSON.parse(json);
    } catch (e) {
        output = null;
    }
    return output;
};

//Get the file if it exists, else create it.
//options can have fields: defaultData, lockfile
exports.getFileOrCreate = function(filepath, options, cb) {
    var settings = {};
    
    assert(filepath);
    //throw Error('util.getFileOrCreate:: requires filepath parameter');
    settings.filepath = filepath;
    
    if (options.defaultData) {
        settings.defaultData = options.defaultData;
    } else {
        settings.defaultData = '';
    }
    if (options.lockfile) {
        settings.lockfile = options.lockfile;
    } else {
        settings.lockfile = filepath + '.lock';
    }
    settings.lockfileOptions = {};
    
    fs.readFile(settings.filepath, function (err, data) {
        if (err) {
            //file doesn't exist, create it
            internals.log('file ' + settings.filepath + ' not found, writing new');
            
            lockfile.lock(settings.lockfile, settings.lockfileOptions, function(lockErr) {
                if (lockErr) {
                    //lock didn't work, bubble error up and don't write the file
                    cb(lockErr);
                } else {
                    fs.writeFile(settings.filepath, settings.defaultData, function(err) {
                        lockfile.unlock(settings.lockfile, function(unlockErr) {
                            if (unlockErr) {
                                internals.log(unlockErr);
                            }
                            cb(err, settings.defaultData);
                        });
                    });
                }
            });
        } else {
            internals.log('file ' + settings.filepath + ' found with contents: ' + data);
            cb(null, data);
        }
    });
};