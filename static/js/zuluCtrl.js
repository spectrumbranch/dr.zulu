angular.module('zuluApp', ['ngRoute', 'zuluApp.project', 'zuluApp.model', 'zuluApp.association']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'project-editor.html',
            controller: 'ZuluController'
        }).
        when('/projects', {
            templateUrl: 'project-list.html',
            controller: 'ZuluController'
        }).
        otherwise({
            redirectTo: '/'
        });
}])
.controller('ZuluController', ['$scope', 'Project', 'Model', 'Association', function($scope, Project, Model, Association) {
    //maybe rename or reorganize this variable
    $scope.constants = {};
    
    $scope.constants = angular.extend({}, $scope.constants, Model.constants);
    $scope.constants = angular.extend({}, $scope.constants, Association.constants);
    
    //TODO: move everything project related into Project service.
    if (Project.current !== null) {
        $scope.currentProject = Project.current;
    } else {
        $scope.currentProject = { name: 'Cartography', id: 0, editModel: false };
        $scope.currentProject.toggleEditMode = function() {
            $scope.currentProject.editMode = !$scope.currentProject.editMode;
        }
        $scope.currentProject.addNewModel = function() {
            var id = $scope.currentProject.models.length; //TODO temporary id situation
            $scope.currentProject.models.push(new Model({ name: 'NewModel' + id, id: id }));
        }
        $scope.currentProject.deleteModel = function(index) {
            $scope.currentProject.models.splice(index, 1);
        }
        
        $scope.currentProject.models = [];
        //TODO remove after development/testing. models should default to none
        $scope.currentProject.models.push(new Model({ name: 'Map', id: 0 }));
        $scope.currentProject.models.push(new Model({ name: 'Tile', id: 1 }));
        
        $scope.currentProject.associations = [];
        //TODO remove after development/testing. associations should default to none
        $scope.currentProject.associations.push(new Association({ sourceModel: $scope.currentProject.models[0], targetModel: $scope.currentProject.models[1], associationType: $scope.constants.associationTypes[2] }));
        $scope.currentProject.associations.push(new Association({ sourceModel: $scope.currentProject.models[1], targetModel: $scope.currentProject.models[0], associationType: $scope.constants.associationTypes[1] }));
        
        $scope.currentProject.showAssociations = true;
        $scope.currentProject.toggleShowAssociations = function() {
            $scope.currentProject.showAssociations = !$scope.currentProject.showAssociations;
        }
        $scope.currentProject.removeAssociation = function(index) {
            $scope.currentProject.associations.splice(index, 1);
        }
        $scope.currentProject.addNewAssociation = function() {
            $scope.currentProject.associations.push(new Association({ sourceModel: {}, targetModel: {}, associationType: {} }));
        }
        
        Project.current = $scope.currentProject;
    }

    
    
    $scope.toJson = function() {
        var cleanProject = {};
        cleanProject.name = $scope.currentProject.name;
        cleanProject.models = [];
        for (var i = 0; i < $scope.currentProject.models.length; i++) {
            cleanProject.models.push($scope.currentProject.models[i].getCleanRepresentation());
        }
        cleanProject.associations = [];
        for (var i = 0; i < $scope.currentProject.associations.length; i++) {
            cleanProject.associations.push($scope.currentProject.associations[i].getCleanRepresentation());
        }
        
        console.log(cleanProject);
    }
}]);