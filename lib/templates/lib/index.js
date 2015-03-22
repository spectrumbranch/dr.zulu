var {{projectVariableName}} = {};
module.exports = {{projectVariableName}};

{{projectVariableName}}.Hapi = require('hapi');
{{projectVariableName}}.Joi = require('joi');
{{projectVariableName}}.Async = require('async');

{{#each models}}
{{../projectVariableName}}.{{name}} = require('./{{file}}');
{{/each}}

{{projectVariableName}}.Routes = require('./routes');