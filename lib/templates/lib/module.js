var {{projectVariableName}};
var internals = {};

internals.data = require('./models');

var {{name}} = {};

{{name}}.create = function(input, callback) {
    internals.data.{{name}}.create(input).success(function(new{{name}}) {
        callback(null, new{{name}});
    });
};

{{name}}.update = function(input, callback) {
    var errorMessages = [];
    //test existence of required fields
    if (!input.id) {
        errorMessages.push('{{name}}.get: Object field "id" is required.');
    }
    
    if (errorMessages.length > 0) {
        callback(new Error(errorMessages));
    } else {
        internals.data.{{name}}.find({ where: { id: input.id } }).success(function({{nameLower}}) {
            var _input = input;
            delete _input.id;
            {{nameLower}}.updateAttributes(input).success(function(output) {
                callback(null, output);
            })
        });
    }
};

{{name}}.getById = function(id, callback) {
    var errorMessages = [];
    //test existence of required fields
    if (!id) {
        errorMessages.push('{{name}}.get: Object field "id" is required.');
    }

    if (errorMessages.length > 0) {
        callback(new Error(errorMessages));
    } else {
        internals.data.{{name}}.find({ where: { id: input.id } )}).success(function(output) {
            callback(null, output);
        })
    }
};

module.exports = function({{projectVariableNameLower}}) {
    {{projectVariableName}} = {{projectVariableNameLower}};
    return {{name}};
};