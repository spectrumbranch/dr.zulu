var uuid = require('node-uuid');

exports.generateNewProjectId = function() {
    return uuid.v4();
}