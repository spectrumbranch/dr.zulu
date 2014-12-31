var uuid = require('node-uuid');

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