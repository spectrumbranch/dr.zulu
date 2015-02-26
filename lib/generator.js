var constants = require('./constants')
  , async = require('async')
  , fs = require('fs')
  , path = require('path')
  , mkdirp = require('mkdirp')
  , handlebars = require('handlebars');

var internals = constants.defaults.generator;
internals._DEBUG_MODE = true;




internals.log = function(msg) {
    if (internals._DEBUG_MODE) {
        console.log('[generator] ', msg);
    }
};

internals.buildPath = function(id, filename) {
    var projectOutputPath = './'+id+'/output';
    console.log('^^^',path.dirname(path.resolve(internals.PROJECT_DIRECTORY, projectOutputPath + '/' + filename)));
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

exports.renderModels = internals.renderModels = function(project, cb) {
    //load lib/models/index.js and lib/models/model.js
    
    internals.log(JSON.stringify(project,null,4));
    async.parallel([
        function(done) {
            var indexTemplatePath = internals.getTemplatePath('lib/models/index.js');
            
            fs.readFile(indexTemplatePath, 'utf-8', function(templateErr, indexTemplate) {
                if (templateErr) {
                    done(templateErr);
                } else {
                    var template = handlebars.compile(indexTemplate.toString());
                    //render template with handlebars
                    var input = { models: [], associations: project.associations };
                    
                    for (var i = 0; i < project.models.length; i++) {
                        var model = project.models[i];
                        input.models.push({ name: model.name, file: model.name.toLowerCase() });
                    }
                    
                    //create and return fileCluster
                    var output = { data: template(input), name: internals.buildPath(project.id, 'lib/models/index.js') };
                    done(templateErr, output);
                }
            });
        },
        function(done) {
            var modelTemplatePath = internals.getTemplatePath('lib/models/model.js');
            
            fs.readFile(modelTemplatePath, 'utf-8', function(templateErr, modelTemplate) {
                if (templateErr) {
                    done(templateErr);
                } else {
                    var template = handlebars.compile(modelTemplate.toString());
                    //TODO render template with handlebars
                    var input = {};
                    var output = [];
                    for (var i = 0; i < project.models.length; i++) {
                        var model = project.models[i];
                        var modelName = model.name;
                        var fields = model.fields;
                        console.log('%%% '+ modelName +' FIELDS ',fields);
                        input = { name: modelName, fields: fields };
                        output.push({ data: template(input), name: internals.buildPath(project.id, 'lib/models/' + modelName.toLowerCase() + '.js') });
                    }
                    
                    //TODO create and return fileCluster
                    done(templateErr, output);
                }
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