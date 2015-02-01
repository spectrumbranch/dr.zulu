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
            cb(null, new Project(data.project));
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
        var newProject = new Project(input);
        //TODO make input {} after development/testing. These things should get defaults        
        // var newProject = new Project({ name: 'Cartography', id: 0 });

        // //TODO remove after development/testing. models should default to none
        // newProject.models.push(new Model({ name: 'Map', id: 0 }));
        // newProject.models.push(new Model({ name: 'Tile', id: 1 }));
        
        // //TODO remove after development/testing. associations should default to none
        // newProject.associations.push(new Association({ sourceModel: newProject.models[0], targetModel: newProject.models[1], associationType: Workspace.constants.associationTypes[2] }));
        // newProject.associations.push(new Association({ sourceModel: newProject.models[1], targetModel: newProject.models[0], associationType: Workspace.constants.associationTypes[1] }));
        
        Workspace.current = newProject;
        return newProject;
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