var internals = {};

internals.home_view = function(request, reply) {
	var isLoggedIn = request.auth.auth;
	console.log('Is logged in: ',isLoggedIn);
	
	var home = 'index';
	
	return reply.view(home, {});
}

exports.home_view = internals.home_view;