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
            Zulu.Projects.getProjectList(function(err, projects) {
                var output = {};
                if (err) {
                    output.error = err;
                }
                output.projects = projects;
                return reply(output);
            });
        }, auth: 'session' } }, 
      { method: 'GET', path: '/projects/default', config: {
        handler: function(request, reply) {
            Zulu.Projects.getDefaultProject(function(err, project) {
                var output = {};
                if (err) {
                    output.error = err;
                }
                output.project = project;
                return reply(output);
            });
        }, auth: 'session' } }, 
      { method: 'GET', path: '/projects/{id}', config: {
        handler: function(request, reply) {
            var id = request.params.id;
            Zulu.Projects.loadProject(id, function(err, project) {
                var output = {};
                if (err) {
                    output.error = err;
                }
                output.project = project;
                return reply(output);
            });
        }, auth: 'session' } }, 
      { method: 'POST', path: '/projects', config: {
        handler: function(request, reply) {
            var input = request.payload;
            Zulu.Projects.createNewProject(input, function(err, project) {
                var output = {};
                if (err) {
                    output.error = err;
                }
                output = project;
                return reply(output);
            });
        }, auth: 'session' } }, 
      { method: 'PUT', path: '/projects/{id}', config: {
        handler: function(request, reply) {
            var input = request.payload;
            input.id = request.params.id;
            Zulu.Projects.saveProject(input, function(err, project) {
                var output = {};
                if (err) {
                    output.error = err;
                }
                output.success = !!project;
                output.project = project;
                return reply(output);
            });
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