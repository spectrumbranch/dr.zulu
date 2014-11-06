var zuluApp = angular.module('zuluApp', []);

zuluApp.controller('ZuluController', ['$scope', function($scope) {
	//TODO refactor constants into service
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
	$scope.currentModel.name = 'Example';
	$scope.currentModel.fields = [];
	$scope.currentModel.fields.push({ name: 'name', type: $scope.constants.dataTypes[0] });
	$scope.currentModel.fields.push({ name: 'description', type: $scope.constants.dataTypes[0] });
}]);