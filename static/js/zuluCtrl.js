angular.module('zuluApp', ['zuluApp.model']).controller('ZuluController', ['$scope', 'Model', function($scope, Model) {
	//maybe rename or reorganize this variable
	$scope.constants = Model.constants;

	$scope.currentProject = { name: 'Cartography', id: 0, editModel: false };
	$scope.currentProject.toggleEditMode = function() {
		$scope.currentProject.editMode = !$scope.currentProject.editMode;
	}
	$scope.currentProject.addNewModel = function() {
		var id = $scope.currentProject.models.length; //TODO temporary id situation
		$scope.currentProject.models.push(new Model({ name: 'NewModel' + id, id: id }));
	}
	$scope.currentProject.models = [];
	$scope.currentProject.models.push(new Model({ name: 'Map', id: 0 }));
	$scope.currentProject.models.push(new Model({ name: 'Tile', id: 1 }));
}]);