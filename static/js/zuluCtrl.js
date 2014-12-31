angular.module('zuluApp', ['ngRoute', 'zuluApp.workspace']).config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'project-editor.html',
            controller: 'ZuluController'
        })
        .when('/projects', {
            templateUrl: 'project-list.html',
            controller: 'ZuluOpenProjectController'
        })
        .when('/projects/new', {
            templateUrl: 'project-new.html',
            controller: 'ZuluNewProjectController'
        })
        .otherwise({
            redirectTo: '/'
        });
}])
.controller('ZuluController', ['$scope', 'Workspace', function($scope, Workspace) {
    $scope.constants = Workspace.constants;
    
    if (Workspace.current !== null) {
        $scope.currentProject = Workspace.current;
    } else {
        $scope.currentProject = Workspace.createProject();
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
}])
.controller('ZuluOpenProjectController', ['$scope', '$http', 'Workspace', function($scope, $http, Workspace) {
    //TODO: get list of projects
    $scope.projectList = [];
    
    $scope.showLoadProject = false;
    
    $scope.getProjectList = function() {
        $http({
            method: 'GET',
            url: '/projects'
        })
        .success(function(data, status) {
            console.log('success');
            console.log(data);
            $scope.projectList = data.projects;
        })
        .error(function(data, status) {
            console.log('error');
            console.log(data);
        });
    };
    
    $scope.getProjectList();
}])
.controller('ZuluNewProjectController', ['$scope', '$http', '$location', 'Workspace', function($scope, $http, $location, Workspace) {
    $scope.newProject = {};
    $scope.newProject.name = '';
    
    $scope.createNewProject = function() {
        $http({
            method: 'POST',
            url: '/projects',
            data: { name: $scope.newProject.name }
        })
        .success(function(data, status) {
            console.log('success');
            console.log(data);
            Workspace.createProject(data.project);
            $location.path('/');
        })
        .error(function(data, status) {
            console.log('error');
            console.log(data);
        });
    };
}]);