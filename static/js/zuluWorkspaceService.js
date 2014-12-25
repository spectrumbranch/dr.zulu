angular.module('zuluApp.workspace', ['zuluApp.project', 'zuluApp.model', 'zuluApp.association']).service('Workspace', ['Project', 'Model', 'Association', function ProjectService(Project, Model, Association){
    this.constants = {};
    this.constants = angular.extend({}, this.constants, Model.constants);
    this.constants = angular.extend({}, this.constants, Association.constants);
    
    this.current = null;

    this.createProject = function createProject() {
        var newProject = {};
        newProject.editModel = false;
        
        newProject.toggleEditMode = function() {
            newProject.editMode = !newProject.editMode;
        }
        newProject.addNewModel = function() {
            var id = newProject.models.length; //TODO temporary id situation
            newProject.models.push(new Model({ name: 'NewModel' + id, id: id }));
        }
        newProject.deleteModel = function(index) {
            newProject.models.splice(index, 1);
        }
        
        newProject.models = [];

        newProject.associations = [];
        
        newProject.showAssociations = true;
        newProject.toggleShowAssociations = function() {
            newProject.showAssociations = !newProject.showAssociations;
        }
        newProject.removeAssociation = function(index) {
            newProject.associations.splice(index, 1);
        }
        newProject.addNewAssociation = function() {
            newProject.associations.push(new Association({ sourceModel: {}, targetModel: {}, associationType: {} }));
        }
        
        
        
        
        //TODO remove after development/testing. These things should get defaults
        newProject.name = 'Cartography';
        newProject.id = 0;
        
        //TODO remove after development/testing. models should default to none
        newProject.models.push(new Model({ name: 'Map', id: 0 }));
        newProject.models.push(new Model({ name: 'Tile', id: 1 }));
        
        //TODO remove after development/testing. associations should default to none
        newProject.associations.push(new Association({ sourceModel: newProject.models[0], targetModel: newProject.models[1], associationType: this.constants.associationTypes[2] }));
        newProject.associations.push(new Association({ sourceModel: newProject.models[1], targetModel: newProject.models[0], associationType: this.constants.associationTypes[1] }));
            
        return newProject;
    };
    
    
}]);