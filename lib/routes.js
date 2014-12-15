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
      { method: 'GET', path: '/constants', config: {
        handler: function(request, reply) {
            return reply(Zulu.Constants);
        }, auth: 'session' } }, 
      { method: 'GET', path: '/projects', config: {
        handler: function(request, reply) {
            Zulu.Projects.getProjectList(function(err, data) {
                var output = {};
                if (err) {
                    output.error = err;
                }
                output.data = data;
                return reply(output);
            });
            return //reply(Zulu.Constants);
        }, auth: 'session' } }, 
	  //Authentication Routes
	  { method: 'POST', path: '/login', config: { handler: Zulu.Auth.login, validate: { payload: login_validate() }, auth: { mode: 'try', strategy: 'session' },
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } },
	  { method: '*', path: '/logout', config: { handler: Zulu.Auth.logout, auth: 'session' } }, 
	  //Views
	  { method: 'GET', path: '/login', config: { handler: Zulu.Auth.login_view, auth: { mode: 'try', strategy: 'session' },
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}  } },
	  //All static content
	  { method: '*', path: '/{path*}', config: { handler: { directory: { path: './static/', redirectToSlash: true } }, auth: 'session' } }
	];
};