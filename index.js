
var Zulu = require('./lib');

var Hapi = Zulu.Hapi,
    options = { cors: true };
var masterConfig = require('./config/config');

var serverConfig = masterConfig.config;
        
if (serverConfig.tls) {
    console.log('Loading tls');
    options.tls = tlsConfig;
}

var server = new Hapi.Server(serverConfig.hostname, serverConfig.port, options);

server.views({
    engines: {
        html: require('handlebars')
    },
    path: './lib/views'
});

server.pack.register(require('hapi-auth-cookie'), function (err) {
	server.auth.strategy('session', 'cookie', {
		password: serverConfig.cookie_password,
		cookie: serverConfig.cookie_name,
		redirectTo: '/login',
		isSecure: serverConfig.tls,
		clearInvalid: true
	});
	//Routes setup
	server.route(Zulu.Routes.get(Zulu));

	//start server
	server.start();
	console.log('Server up at ' + server.info.uri + ' !');
});
