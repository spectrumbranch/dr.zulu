var fs = require('fs')
  , path = require('path')
  , util = require('./util')
  , lockfile = require('lockfile')
  , async = require('async')
  , handlebars = require('handlebars');

var internals = {};
internals._DEBUG_MODE = true;

internals.PROJECT_DIRECTORY = path.resolve(__dirname, '../projects');
internals.TEMPLATE_DIRECTORY = path.resolve(__dirname, './templates');

internals.CREATE_PROJECT_DIRECTORY_MODE = '0775';

internals.PROJECT_LIST_JSON_FILEPATH = path.resolve(internals.PROJECT_DIRECTORY, './projects.json');
internals.DEFAULT_PROJECT_LIST_DATA = [];
internals.DEFAULT_PROJECT_LIST_DATA = JSON.stringify(internals.DEFAULT_PROJECT_LIST_DATA);
internals.PROJECT_LIST_LOCKFILE = internals.PROJECT_LIST_JSON_FILEPATH + '.lock';
internals.PROJECT_LIST_LOCKFILE_OPTIONS = {};


internals.DEFAULTS_JSON_FILEPATH = path.resolve(internals.PROJECT_DIRECTORY, './defaults.json');
internals.DEFAULT_DEFAULTS_DATA = { project: false };
internals.DEFAULT_DEFAULTS_DATA = JSON.stringify(internals.DEFAULT_DEFAULTS_DATA);
internals.DEFAULTS_LOCKFILE = internals.DEFAULTS_JSON_FILEPATH + '.lock';
internals.DEFAULTS_LOCKFILE_OPTIONS = {};

internals.ZULU_FILE_TEMPLATE_FILEPATH = path.resolve(internals.TEMPLATE_DIRECTORY, './zulu.json');



internals.DEFAULT_PROJECT_NAME = 'NEW PROJECT';

  
//read lists of available projects
//load up project meta

internals.log = function(msg) {
    if (internals._DEBUG_MODE) {
        console.log('[projects] ', msg);
    }
};

exports.createNewProject = internals.createNewProject = function(input, cb) {
    //TODO: sanitize projectName
    var projectName = input && input.name ? input.name : internals.DEFAULT_PROJECT_NAME;
    var newID = util.generateNewProjectId();
    var project = { id: newID, name: projectName };
    
    internals.createProjectMeta(project, function(err, zuluFile) {
        internals.appendToProjectListFile(project, function(err2, data) {
            internals.setDefaultProject(newID, function(err3, defaultData) {
                cb(err2, data);
            });
        });
    });
};

exports.getDefaultProject = internals.getDefaultProject = function(cb) {
    util.getFileOrCreate(internals.DEFAULTS_JSON_FILEPATH, { defaultData: internals.DEFAULT_DEFAULTS_DATA, lockfile: internals.DEFAULTS_LOCKFILE }, function(err, defaults) {
        if (err) {
            throw err;
        } else {
            var defaultObj = util.parseJSON(defaults);
            if (defaultObj != null && defaultObj.project) {
                internals.getProjectById(defaultObj.project, function(err3, projectData) {
                    cb(err3, projectData);
                });
            } else {
                internals.getProjectList(function(err2, projects) {
                    if (!err2 && projects.length > 0) {
                        internals.getProjectById(projects[0].id, function(err3, projectData) {
                            cb(err3, projectData);
                        });
                    } else {
                        cb(err2, false);
                    }
                });
            }
        }
    });
};

exports.loadProject = internals.loadProject = function(id, cb) {
    internals.getProjectById(id, function(err, project) {
        internals.setDefaultProject(id, function(err2, projectdta) {
            cb(err, project);
        });
    });
};

exports.getProjectById = internals.getProjectById = function(id, cb) {
    fs.readFile(path.resolve(internals.PROJECT_DIRECTORY, './'+id+'/zulu.json'), 'utf-8', function(err, data) {
        if (err) {
            internals.log(err);
        }
        cb(err, util.parseJSON(data));
    });
};

exports.getProjectList = internals.getProjectList = function(cb) {
    util.getFileOrCreate(internals.PROJECT_LIST_JSON_FILEPATH, { defaultData: internals.DEFAULT_PROJECT_LIST_DATA, lockfile: internals.PROJECT_LIST_LOCKFILE } , function(err, projects) {
        cb(err, util.parseJSON(projects));
    });
};

internals.setDefaultProject = function(id, cb) {
    util.getFileOrCreate(internals.DEFAULTS_JSON_FILEPATH, { defaultData: internals.DEFAULT_DEFAULTS_DATA, lockfile: internals.DEFAULTS_LOCKFILE }, function(err, defaults) {
        if (err) {
            throw err;
        } else {
            var newDefaults = util.parseJSON(defaults);
            newDefaults.project = id;
            internals.writeDefaultsFile(newDefaults, function(err2, data) {
                cb(err2, data);
            });
        }
    });
};

internals.createProjectMeta = function(input, cb) {
    var id = input.id;
    var projectName = input.name;
    
    //create directory 
    internals.createProjectDirectory(id, function(err) {
        if (err) {
            internals.log(err);
        }
        
        //create zulu.json file
        internals.createProjectZuluFile({ id: id, name: projectName }, function(err2, zuluFile) {
            if (err2) {
                internals.log(err2);
            }
            cb(null, zuluFile);
        });
    });
};

internals.createProjectZuluFile = function(input, cb) {
    var id = input.id;
    var projectName = input.name;
    var zuluFilePath = path.resolve(internals.PROJECT_DIRECTORY, './'+id+'/zulu.json');
    
    var zuluFileLockfile = zuluFilePath + '.lock';

    fs.readFile(internals.ZULU_FILE_TEMPLATE_FILEPATH, 'utf-8', function(templateErr, zuluTemplate) {
        if (templateErr) {
            internals.log(templateErr);
        }
        
        var template = handlebars.compile(zuluTemplate.toString());
        console.log(zuluTemplate);
        var zuluFileDefaultData = template(input);
        console.log(zuluFileDefaultData.toString());
        util.getFileOrCreate(zuluFilePath, { defaultData: zuluFileDefaultData, lockfile: zuluFileLockfile }, function(err, zuluFile) {
            cb(err, zuluFile);
        });
    });
};

internals.createProjectDirectory = function(projectId, cb) {
    var directory = path.resolve(internals.PROJECT_DIRECTORY, './' + projectId + '/')
    fs.mkdir(directory, internals.CREATE_PROJECT_DIRECTORY_MODE, function(err) {
        cb(err);
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
internals.writeDefaultsFile = function(defaults, cb) {
    lockfile.lock(internals.DEFAULTS_LOCKFILE, internals.DEFAULTS_LOCKFILE_OPTIONS, function(lockErr) {
        if (lockErr) {
            //lock didn't work, bubble error up and don't write the file
            cb(lockErr);
        } else {
            fs.writeFile(internals.DEFAULTS_JSON_FILEPATH, JSON.stringify(defaults), function(err) {
                lockfile.unlock(internals.DEFAULTS_LOCKFILE, function(unlockErr) {
                    if (unlockErr) {
                        internals.log(unlockErr);
                    }
                    cb(err, defaults);
                });
            });
        }
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
