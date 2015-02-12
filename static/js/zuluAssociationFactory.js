angular.module('zuluApp.association', ['zuluApp.model']).factory('Association', ['Model', function AssociationFactory(Model) {
    //Constructor
    var Association = function(input) {
        // //input fields
        
        this.sourceModel = new Model(input.sourceModel);
        this.targetModel = new Model(input.targetModel);
        this.associationType = input.associationType;
        
        //field defaults
        this.hasForeignKey = false;
        this.foreignKey = "";
        
        this.hasAlias = false;
        this.alias = "";
        
        this.hasThrough = false;
        this.through = "";
    };
    
    Association.constants = {};
    Association.constants.associationTypes = [
        { id: 0, name: 'hasOne' },
        { id: 1, name: 'belongsTo' },
        { id: 2, name: 'hasMany' }
    ];
    
    Association.prototype.getCleanRepresentation = function() {
        var output = {};
        
        output.sourceModel = this.sourceModel.id;
        output.targetModel = this.targetModel.id;
        output.associationType = this.associationType.id;
        
        if (this.hasForeignKey) {
            output.foreignKey = this.foreignKey;
        }
        
        if (this.hasAlias) {
            output.alias = this.alias;
        }
        
        if (this.hasThrough) {
            output.through = this.through.id;
        }
        
        return output;
    };

    return Association;
}]);