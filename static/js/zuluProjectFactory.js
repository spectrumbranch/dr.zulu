angular.module('zuluApp.project', ['zuluApp.model', 'zuluApp.association']).factory('Project', ['Model', 'Association', function ProjectFactory(Model, Association) {
    //Constructor
    var Project = function(input) {
        if (input) {
            this.name = input.name;
            this.id = input.id;
        }
        
        //default fields
        //view status fields
        this.editMode = false;
        this.showAssociations = true;
        
        //data fields
        this.models = [];
        for (var i = 0; i < input.models.length; i++) {
            this.models.push(new Model(input.models[i]));
        }
        
        this.associations = [];
        for (var i = 0; i < input.associations.length; i++) {
            this.associations.push(new Association(input.associations[i]));
        }
    };
    
    Project.prototype.toggleEditMode = function() {
        this.editMode = !this.editMode;
    }
    
    
    //Model methods
    Project.prototype.addNewModel = function() {
        var id = this.models.length; //TODO temporary id situation
        this.models.push(new Model({ name: 'NewModel' + id, id: id }));
    }
    Project.prototype.deleteModel = function(index) {
        this.models.splice(index, 1);
    }
    
    //Association methods
    Project.prototype.toggleShowAssociations = function() {
        this.showAssociations = !this.showAssociations;
    }
    Project.prototype.removeAssociation = function(index) {
        this.associations.splice(index, 1);
    }
    Project.prototype.addNewAssociation = function() {
        this.associations.push(new Association({ sourceModel: {}, targetModel: {}, associationType: {} }));
    }
    
    return Project;
}]);
