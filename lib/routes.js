module.exports.get = function(Zulu) {

	login_validate = function() {
		var S = Zulu.Joi.string;
		return {
			username: S().required(),
			passwrd: S().required(),
			view: S()
		}
	}


	return [
	  //Zulu Routes
	  //Authentication Routes
	  { method: 'POST', path: '/login', config: { handler: Zulu.Auth.login, validate: { payload: login_validate() }, auth: { mode: 'try', strategy: 'session' },
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } },
	  { method: '*', path: '/logout', config: { handler: Zulu.Auth.logout, auth: 'session' } }, 
	  //Views
	  { method: 'GET', path: '/', config: { handler: Zulu.Home.home_view, auth: 'session'  } },
	  { method: 'GET', path: '/login', config: { handler: Zulu.Auth.login_view, auth: { mode: 'try', strategy: 'session' },
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } },
	  //All static content
	  { method: '*', path: '/{path*}', config: { handler: { directory: { path: './static/', redirectToSlash: true } }, auth: { mode: 'try', strategy: 'session' },
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } }
	];
};