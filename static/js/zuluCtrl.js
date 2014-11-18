angular.module('zuluApp', ['zuluApp.model']).controller('ZuluController', ['$scope', 'Model', function($scope, Model) {
	//maybe rename or reorganize this variable
	$scope.constants = Model.constants;
	
	$scope.constants.associationTypes = [
		{ name: 'One to One', id: 0 },
		{ name: 'One to Many', id: 1 },
		{ name: 'Many to Many', id: 2 }
	];

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
	
	$scope.currentProject.associations = [];
	
	
	$scope.toJson = function() {
		var cleanProject = {};
		cleanProject.name = $scope.currentProject.name;
		cleanProject.models = [];
		for (var i = 0; i < $scope.currentProject.models.length; i++) {
			cleanProject.models.push($scope.currentProject.models[i].getCleanRepresentation());
		}
		console.log(cleanProject);
	}
}]);