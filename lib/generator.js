
var internals = {};
internals._DEBUG_MODE = true;




internals.log = function(msg) {
    if (internals._DEBUG_MODE) {
        console.log('[generator] ', msg);
    }
};

internals.buildPath = function(id, filename) {
    var projectOutputPath = '/'+id+'/output';
    return path.resolve(internals.PROJECT_DIRECTORY, projectOutputPath + '/' + filename);
};

exports.writeFileCluster = internals.writeFileCluster = function(fileCluster, cb) {
    var fullyWritten = false;
    if (fileCluster.length > 0) {
        for (var i = 0; i < fileCluster.length; i++) {
            //TODO enclose functions that do the writing of the file
        }
        cb(null, fullyWritten);
    } else {
        cb(new Error('generator.writeFileCluster:: Nothing to write. fileCluster is empty.'), fullyWritten);
    }
};

exports.renderModels = internals.renderModels = function(project, cb) {
    
    cb();
};

exports.renderLibrary = internals.renderLibrary = function(project, cb) {
    cb();
};

exports.renderRoutes = internals.renderRoutes = function(project, cb) {
    cb();
};

exports.renderTests = internals.renderTests = function(project, cb) {
    cb();
};