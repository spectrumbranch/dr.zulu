var Zulu = {};
module.exports = Zulu;

Zulu.Hapi = require('hapi');
Zulu.Joi = require('joi');
Zulu.Async = require('async');






var auth = require('./auth');
Zulu.Auth = auth;

var home = require('./home');
Zulu.Home = home;

var routes = require('./routes');
Zulu.Routes = routes;