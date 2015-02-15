angular.module('zuluApp.project', ['zuluApp.model', 'zuluApp.association']).factory('Project', ['Model', 'Association', function ProjectFactory(Model, Association) {
    //Constructor
    var Project = function(input) {
        //default fields
        //view status fields
        this.editMode = false;
        this.showAssociations = true;
        
        //data fields
        this.models = [];
        this.associations = [];
    
        if (input) {
            this.name = input.name;
            this.id = input.id;
            
            if (input.models) {
                for (var i = 0; i < input.models.length; i++) {
                    this.addModel(input.models[i]);
                }
            }
            
            if (input.associations) {
                for (var i = 0; i < input.associations.length; i++) {
                    this.addAssociation(input.associations[i]);
                }
            }
        }
    };
    
    Project.prototype.toggleEditMode = function() {
        this.editMode = !this.editMode;
    }
    
    
    //Model methods
    Project.prototype.addModel = function(model) {
        this.models.push(new Model(model));
    }
    
    Project.prototype.getModelById = function(id) {
        var model = null;
        for (var i = 0; i < this.models.length; i++) {
            if (this.models[i].id == id) {
                model = this.models[i];
                break;
            }
        }
        return model;
    }
    
    Project.prototype.addNewModel = function() {
        var id = this.models.length;
        this.models.push(new Model({ name: 'NewModel' + id, id: id }));
    }
    Project.prototype.deleteModel = function(index) {
        this.models.splice(index, 1);
    }
    
    //Association methods
    Project.prototype.addAssociation = function(association) {
        //angular loads the view's ng-options elements by reference, so we need to refresh the references
        if (association.sourceModel) {
            var sourceModel = this.getModelById(association.sourceModel.id);
            if (sourceModel != null) {
                association.sourceModel = sourceModel;
            } else {
                console.log('sourceModel attempted to load but was not found');
            }
        }
        if (association.targetModel) {
            var targetModel = this.getModelById(association.targetModel.id);
            if (targetModel != null) {
                association.targetModel = targetModel;
            } else {
                console.log('targetModel attempted to load but was not found');
            }
        }
        if (association.associationType) {
            var associationType = this.getAssociationTypeById(association.associationType.id);
            if (associationType != null) {
                association.associationType = associationType;
            } else {
                console.log('associationType attempted to load but was not found');
            }
        }
        this.associations.push(new Association(association));
    }
    
    Project.prototype.getAssociationTypeById = function(id) {
        var associationType = null;
        for (var i = 0; i < Association.constants.associationTypes.length; i++) {
            if (Association.constants.associationTypesw[i].id == id) {
                associationType = Association.constants.associationTypes[i];
                break;
            }
        }
        return associationType;
    }
    
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
