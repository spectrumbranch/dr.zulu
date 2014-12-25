angular.module('zuluApp', ['ngRoute', 'zuluApp.workspace', 'zuluApp.project', 'zuluApp.model', 'zuluApp.association']).config(['$routeProvider', function($routeProvider) {
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
.controller('ZuluController', ['$scope', 'Workspace', 'Project', 'Model', 'Association', function($scope, Workspace, Project, Model, Association) {
    //maybe rename or reorganize this variable

    $scope.constants = Workspace.constants;
    
    //TODO: move everything project related into Project service.
    if (Workspace.current !== null) {
        $scope.currentProject = Workspace.current;
    } else {
        $scope.currentProject = Workspace.createProject();

        //TODO should this line be moved to inside of Workspace.createProject()?
        Workspace.current = $scope.currentProject;
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