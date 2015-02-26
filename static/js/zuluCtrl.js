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
        .when('/projects/save', {
            templateUrl: 'project-editor.html',
            controller: 'ZuluSaveProjectController'
        })
        .when('/projects/generate', {
            templateUrl: 'project-editor.html',
            controller: 'ZuluGenerateProjectController'
        })
        .otherwise({
            redirectTo: '/'
        });
}])
.controller('ZuluController', ['$scope', 'Workspace', function($scope, Workspace) {
    $scope.constants = Workspace.constants;
    
    console.log('current workspace:', Workspace.current);
    
    if (Workspace.current !== null) {
        $scope.currentProject = Workspace.current;
    } else {
        Workspace.openDefaultProject(function(err, project) {
            if (!err) {
                $scope.currentProject = project;
            } else {
                //TODO do something
            }
        });
    }
    
    //TODO: move this to project
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
.controller('ZuluOpenProjectController', ['$scope', '$location', 'Workspace', function($scope, $location, Workspace) {
    $scope.projectList = [];
    $scope.selectedProject = null;
    $scope.showLoadProject = false;
    
    $scope.selectProject = function(index) {
        $scope.selectedProject = index;
        $scope.showLoadProject = true;
    };
    
    $scope.loadProject = function() {
        if ($scope.selectedProject != null) {
            Workspace.loadProject($scope.projectList[$scope.selectedProject].id, function() {
                $location.path('/');
            });
        }
    };
    
    Workspace.getProjectList(function(err, data) {
        if (!err) {
            $scope.projectList = data.projects;
        }
    });
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
            console.log('created new project', data);
            Workspace.createProject(data.project);
            $location.path('/');
        })
        .error(function(data, status) {
            console.log('error');
            console.log(data);
        });
    };
}])
.controller('ZuluSaveProjectController', ['$scope', '$http', '$location', 'Workspace', function($scope, $http, $location, Workspace) {
    if (Workspace.current === null) {
        $location.path('/');
    } else {
        $scope.project = Workspace.current;
        $http({
            method: 'PUT',
            url: '/projects/' + $scope.project.id,
            data: $scope.project
        })
        .success(function(data, status) {
            console.log('success');
            console.log(data);
            $location.path('/');
        })
        .error(function(data, status) {
            console.log('error');
            console.log(data);
            $location.path('/');
        });
    }
}])
.controller('ZuluGenerateProjectController', ['$scope', '$http', '$location', 'Workspace', function($scope, $http, $location, Workspace) {
    if (Workspace.current === null) {
        $location.path('/');
    } else {
        $scope.project = Workspace.current;
        $http({
            method: 'POST',
            url: '/projects/' + $scope.project.id + '/generate',
            data: $scope.project
        })
        .success(function(data, status) {
            console.log('success');
            console.log(data);
            $location.path('/');
        })
        .error(function(data, status) {
            console.log('error');
            console.log(data);
            $location.path('/');
        });
    }
}]);