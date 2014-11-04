var internals = {};
internals.redirectAuthenticatedDefault = '/';
internals.redirectBadLogin = '/login?badlogin';


internals.verifyCredentials = function(input, cb) {
	//TODO
	cb(null, true);
};

internals.login = function(request, reply) {
	if (request.auth.isAuthenticated) {
		return reply.redirect(internals.redirectAuthenticatedDefault);
	}
	var message = '';
	var account = null;
	
	if (!request.payload.username || !request.payload.passwrd) {
		message = 'Missing username or password';
	} else {
		var password_input = request.payload.passwrd;
		var username_input = request.payload.username;
		var isView = request.payload.view === 'true';
		
		internals.verifyCredentials({username: username_input, passwrd: password_input}, function(err, isValid) {
			if (isValid) {
				//It matches!
				request.auth.session.set({ auth: true });
				return reply.redirect(internals.redirectAuthenticatedDefault);
			} else {
				//It doesn't match.
				if (isView) {
					return reply.redirect(internals.redirectBadLogin);
				} else {
					//is JSON API format
					message = 'Invalid username or password';
					return reply({ status: 'errors', errors: [message] });
				}
			}
		})
	}
}

internals.login_view = function(request, reply) {
	if (request.auth.isAuthenticated) {
		return reply.redirect(internals.redirectAuthenticatedDefault);
	}

	return reply.view('login', {});
}

internals.logout = function(request, reply) {
    request.auth.session.clear();
    return reply.redirect(internals.redirectAuthenticatedDefault);
}

exports.logout = internals.logout;
exports.login = internals.login;
exports.login_view = internals.login_view;