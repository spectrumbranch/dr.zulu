var Zulu = {};
module.exports = Zulu;

Zulu.Hapi = require('hapi');
Zulu.Joi = require('joi');
Zulu.Async = require('async');

var constants = require('./constants');
Zulu.Constants = constants;

var auth = require('./auth');
Zulu.Auth = auth;

var routes = require('./routes');
Zulu.Routes = routes;