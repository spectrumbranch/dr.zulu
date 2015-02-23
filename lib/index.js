var Zulu = {};
module.exports = Zulu;

//3rd party modules
Zulu.Hapi = require('hapi');
Zulu.Joi = require('joi');
Zulu.Async = require('async');

//local modules
Zulu.Constants = require('./constants');
Zulu.Util = require('./util');
Zulu.Projects = require('./projects');
Zulu.Generator = require('./generator');

//

var auth = require('./auth');
Zulu.Auth = auth;

var routes = require('./routes');
Zulu.Routes = routes;