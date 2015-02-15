angular.module('zuluApp.workspace', ['zuluApp.project', 'zuluApp.model', 'zuluApp.association']).service('Workspace', ['$http', 'Project', 'Model', 'Association', function Workspace($http, Project, Model, Association){
    var Workspace = this;
    Workspace.constants = {};
    Workspace.constants = angular.extend({}, Workspace.constants, Model.constants);
    Workspace.constants = angular.extend({}, Workspace.constants, Association.constants);
    
    Workspace.current = null;
    
    Workspace.openDefaultProject = function openDefaultProject(cb) {
        $http({
            method: 'GET',
            url: '/projects/default'
        })
        .success(function(data, status) {
            console.log('successfully opened default project',data);
            Workspace.current = new Project(data.project);
            cb(null, Workspace.current);
        })
        .error(function(data, status) {
            console.log('error');
            console.log(data);
            cb(new Error('Error while getting default project'), data);
        });
    };
    
    Workspace.getProjectList = function(cb) {
        $http({
            method: 'GET',
            url: '/projects'
        })
        .success(function(data, status) {
            console.log('successfully obtained project list', data);
            cb(null, data);
        })
        .error(function(data, status) {
            console.log('error');
            console.log(data);
            cb(new Error('Error while getting project list'), data);
        });
    };

    Workspace.createProject = function createProject(input) {
        Workspace.current = new Project(input);
        return Workspace.current;
    };
    
    
    Workspace.loadProject = function loadProject(id, cb) {
        $http({
            method: 'GET',
            url: '/projects/' + id
        })
        .success(function(data, status) {
            console.log('successfully loaded project',  data);
            Workspace.current = new Project(data.project);
            cb(null, data);
        })
        .error(function(data, status) {
            console.log('error');
            console.log(data);
            cb(new Error('Error while getting project ' + id), data);
        });
    };
    
    
}]);