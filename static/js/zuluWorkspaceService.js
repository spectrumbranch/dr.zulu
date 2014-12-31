angular.module('zuluApp.workspace', ['zuluApp.project', 'zuluApp.model', 'zuluApp.association']).service('Workspace', ['Project', 'Model', 'Association', function ProjectService(Project, Model, Association){
    this.constants = {};
    this.constants = angular.extend({}, this.constants, Model.constants);
    this.constants = angular.extend({}, this.constants, Association.constants);
    
    this.current = null;

    this.createProject = function createProject(input) {
        var newProject = new Project(input);
        //TODO make input {} after development/testing. These things should get defaults        
        // var newProject = new Project({ name: 'Cartography', id: 0 });

        // //TODO remove after development/testing. models should default to none
        // newProject.models.push(new Model({ name: 'Map', id: 0 }));
        // newProject.models.push(new Model({ name: 'Tile', id: 1 }));
        
        // //TODO remove after development/testing. associations should default to none
        // newProject.associations.push(new Association({ sourceModel: newProject.models[0], targetModel: newProject.models[1], associationType: this.constants.associationTypes[2] }));
        // newProject.associations.push(new Association({ sourceModel: newProject.models[1], targetModel: newProject.models[0], associationType: this.constants.associationTypes[1] }));
        
        this.current = newProject;
        return newProject;
    };
    
    
}]);