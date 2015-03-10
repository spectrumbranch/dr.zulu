var constants = require('./constants')
  , async = require('async')
  , fs = require('fs')
  , path = require('path')
  , mkdirp = require('mkdirp')
  , handlebars = require('handlebars');

var internals = constants.defaults.generator;
internals._DEBUG_MODE = false;




internals.log = function(msg) {
    if (internals._DEBUG_MODE) {
        console.log('[generator] ', msg);
    }
};

internals.buildPath = function(id, filename) {
    var projectOutputPath = './'+id+'/output';
    internals.log('^^^' + path.dirname(path.resolve(internals.PROJECT_DIRECTORY, projectOutputPath + '/' + filename)));
    return path.resolve(internals.PROJECT_DIRECTORY, projectOutputPath + '/' + filename);
};

internals.writeFileClosure = function(fileCluster) {
    return function(done) {
        mkdirp(path.dirname(fileCluster.name), function(mkdirpErr) {
            if (mkdirpErr) {
                internals.log(mkdirpErr);
                done(mkdirpErr);
            } else {
                fs.writeFile(fileCluster.name, fileCluster.data, function(writeFileErr) {
                    if (writeFileErr) {
                        internals.log(writeFileErr);
                    }
                    done(writeFileErr);
                });
            }
        });
    }
};

exports.writeFileCluster = internals.writeFileCluster = function(fileCluster, cb) {
    var fullyWritten = false;
    if (fileCluster.length > 0) {
        var fns = [];
        for (var i = 0; i < fileCluster.length; i++) {
            //enclose functions that do the writing of the file
            if (fileCluster[i]) {
                fns.push(internals.writeFileClosure(fileCluster[i]));
            }
        }
        
        async.parallel(fns, function(err) {
            cb(err, fullyWritten);
        });
    } else {
        cb(new Error('generator.writeFileCluster:: Nothing to write. fileCluster is empty.'), fullyWritten);
    }
};

exports.renderModelIndex = internals.renderModelIndex = function(project, cb) {
    var indexTemplatePath = internals.getTemplatePath('lib/models/index.js');
            
    fs.readFile(indexTemplatePath, 'utf-8', function(templateErr, indexTemplate) {
        if (templateErr) {
            cb(templateErr);
        } else {
            var template = handlebars.compile(indexTemplate.toString());

            var input = { models: [], associations: project.associations };
            for (var i = 0; i < project.models.length; i++) {
                var model = project.models[i];
                input.models.push({ name: model.name, file: model.name.toLowerCase() });
            }
            
            //render template, and return it as a fileCluster
            var output = { data: template(input), name: internals.buildPath(project.id, 'lib/models/index.js') };
            cb(templateErr, output);
        }
    });
};

exports.renderModel = internals.renderModel = function(project, cb) {
    var modelTemplatePath = internals.getTemplatePath('lib/models/model.js');
            
    fs.readFile(modelTemplatePath, 'utf-8', function(templateErr, modelTemplate) {
        if (templateErr) {
            cb(templateErr);
        } else {
            var template = handlebars.compile(modelTemplate.toString());
            
            var input = {};
            var output = [];
            for (var i = 0; i < project.models.length; i++) {
                var model = project.models[i];
                var modelName = model.name;
                var fields = model.fields;
                internals.log('%%% '+ modelName +' FIELDS ',fields);
                input = { name: modelName, fields: fields };
                //create and append fileClusters per model
                output.push({ data: template(input), name: internals.buildPath(project.id, 'lib/models/' + modelName.toLowerCase() + '.js') });
            }
            
            cb(templateErr, output);
        }
    });
};

exports.renderModels = internals.renderModels = function(project, cb) {
    //load lib/models/index.js and lib/models/model.js
    
    internals.log(JSON.stringify(project,null,4));
    async.parallel([
        function(done) {
            internals.renderModelIndex(project, function(err, fileCluster) {
                done(err, fileCluster);
            });
        },
        function(done) {
            internals.renderModel(project, function(err, fileCluster) {
                done(err, fileCluster);
            });
        }
    ],
    function(err, resultCluster) {
        var output = [];
        for (var i = 0; i < resultCluster.length; i++) {
            var cluster = resultCluster[i];
            if (Array.isArray(cluster)) {
                output = output.concat(cluster);
            } else {
                output.push(cluster);
            }
        }
        cb(err, output);
    })
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