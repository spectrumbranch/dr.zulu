angular.module('zuluApp', ['zuluApp.model']).controller('ZuluController', ['$scope', 'Model', function($scope, Model) {
	//maybe rename or reorganize this variable
	$scope.constants = Model.constants;

	$scope.currentModel = new Model({ name: 'Example2', id: 0 });
}]);