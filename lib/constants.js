var path = require('path');


var constants = {};

constants.dataTypes = [
    { name: "STRING", lengthField: true },
    { name: "INTEGER", lengthField: true, unsignable: true, zerofillable: true },
    { name: "BIGINT", lengthField: true, unsignable: true, zerofillable: true },
    { name: "FLOAT", lengthField: true, decimalLengthField: true, unsignable: true, zerofillable: true },
    { name: "DECIMAL", lengthField: true, decimalLengthField: true },
    { name: "DATE", isDate: true },
    { name: "BOOLEAN" },
    { name: "ENUM", isEnum: true }
];

constants.associationTypes = [
    { id: 0, name: 'hasOne' },
    { id: 1, name: 'belongsTo' },
    { id: 2, name: 'hasMany' }
];

constants.defaults = {};
constants.defaults.project = {};
constants.defaults.generator = {};

constants.defaults.generator.TEMPLATE_DIRECTORY = path.resolve(__dirname, './templates');

constants.defaults.generator.getTemplatePath = function(template) {
    return path.resolve(constants.defaults.generator.TEMPLATE_DIRECTORY, './' + template);
};


constants.defaults.project.PROJECT_DIRECTORY = constants.defaults.generator.PROJECT_DIRECTORY = path.resolve(__dirname, '../projects');


constants.defaults.project.CREATE_PROJECT_DIRECTORY_MODE = '0775';

constants.defaults.project.PROJECT_LIST_JSON_FILEPATH = path.resolve(constants.defaults.project.PROJECT_DIRECTORY, './projects.json');
constants.defaults.project.DEFAULT_PROJECT_LIST_DATA = [];
constants.defaults.project.DEFAULT_PROJECT_LIST_DATA = JSON.stringify(constants.defaults.project.DEFAULT_PROJECT_LIST_DATA);
constants.defaults.project.PROJECT_LIST_LOCKFILE = constants.defaults.project.PROJECT_LIST_JSON_FILEPATH + '.lock';
constants.defaults.project.PROJECT_LIST_LOCKFILE_OPTIONS = {};


constants.defaults.project.DEFAULTS_JSON_FILEPATH = path.resolve(constants.defaults.project.PROJECT_DIRECTORY, './defaults.json');
constants.defaults.project.DEFAULT_DEFAULTS_DATA = { project: false };
constants.defaults.project.DEFAULT_DEFAULTS_DATA = JSON.stringify(constants.defaults.project.DEFAULT_DEFAULTS_DATA);
constants.defaults.project.DEFAULTS_LOCKFILE = constants.defaults.project.DEFAULTS_JSON_FILEPATH + '.lock';
constants.defaults.project.DEFAULTS_LOCKFILE_OPTIONS = {};

constants.defaults.project.ZULU_FILE_TEMPLATE_FILEPATH = constants.defaults.generator.getTemplatePath('./zulu.json');

constants.defaults.project.DEFAULT_PROJECT_NAME = 'NEW PROJECT';


module.exports = constants;