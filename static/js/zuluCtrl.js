var zuluApp = angular.module('zuluApp', []);

zuluApp.controller('ZuluController', ['$scope', function($scope) {
	//TODO refactor constants into service, or something
	$scope.constants = {};
	$scope.constants.dataTypes = [
		{ name: "STRING" },
		{ name: "INTEGER" },
		{ name: "BIGINT" },
		{ name: "FLOAT" },
		{ name: "DECIMAL" },
		{ name: "DATE" },
		{ name: "BOOLEAN" }
	];
	
	$scope.currentModel = {};
	$scope.currentModel.editMode = false;
	$scope.currentModel.name = 'Example';
	$scope.currentModel.id = 0;
	$scope.currentModel.fields = [];
	$scope.currentModel.fields.push({ name: 'name', type: $scope.constants.dataTypes[0], length: '10', allowNull: false });
	
	$scope.currentModel.toggleEditMode = function() {
		$scope.currentModel.editMode = !$scope.currentModel.editMode;
	}
	
	$scope.currentModel.addNewField = function() {
		$scope.currentModel.fields.push({ name: '', type: $scope.constants.dataTypes[0], length: '' });
	}
	
	$scope.currentModel.removeField = function(index) {
		$scope.currentModel.fields.splice(index, 1);
	}
}]);