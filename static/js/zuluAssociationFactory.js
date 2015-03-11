angular.module('zuluApp.association', ['zuluApp.model']).factory('Association', ['Model', function AssociationFactory(Model) {
    //Constructor
    var Association = function(input) {
        // //input fields
        
        this.sourceModel = input.sourceModel;
        this.targetModel = input.targetModel;
        this.associationType = input.associationType;
        
        //field defaults
        
        if (typeof input.foreignKey != undefined) {
            this.foreignKey = input.foreignKey;
        } else {            
            this.foreignKey = "";
        }                
        this.hasForeignKey = !!input.hasForeignKey;

        if (typeof input.alias != undefined) {
            this.alias = input.alias;
        } else {
            this.alias = "";
        }
        this.hasAlias = !!input.hasAlias;
             
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