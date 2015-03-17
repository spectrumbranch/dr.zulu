angular.module('zuluApp.model', ['zuluApp.field']).factory('Model', ['Field', function ModelFactory(Field) {
    //Constructor
    var Model = function(input) {
        //input fields
        this.name = input.name;
        this.id = input.id;
        
        //default fields
        //view status fields
        this.editMode = false;
        this.active = false;
        //data fields
        this.fields = [];
        
        if (input.fields) {
            for (var i = 0; i < input.fields.length; i++) {
                this.addField(input.fields[i]);
            }
        } else {
            //create a default field
            this.addNewField();
        }
    };
    
    Model.constants = {};
    Model.constants = Field.constants;
    
    Model.prototype.toggleEditMode = function() {
        this.editMode = !this.editMode;
    };
    
    Model.prototype.toggleActive = function() {
        this.active = !this.active;
    };
    
    Model.prototype.addField = function(field) {
        //angular loads the view's ng-options elements by reference, so we need to refresh the references
        if (field.type) {
            var type = Field.constants.getDataTypeByObject(field.type);
            if (type != null) {
                field.type = type;
            } else {
                console.log('type attempted to load but was not found');
            }
        }
        this.fields.push(new Field(field));
    }
    
    //adds default values to a field
    Model.prototype.addNewField = function() {
        this.addField({ name: '', type: Model.constants.dataTypes[0], length: '' });
    };
    
    Model.prototype.removeField = function(field) {
        var index = this.fields.indexOf(field);
        this.fields.splice(index, 1);
    };
    
    Model.prototype.getCleanRepresentation = function() {
        var output = {};
        
        output.name = this.name;
        output.id = this.id;
        output.fields = [];
        
        for (var i = 0; i < this.fields.length; i++) {
            var field = this.fields[i];
            var cleanField = {};
            
            cleanField.allowNull = field.allowNull;
            cleanField.name = field.name;
            cleanField.type = field.type.name;
            if (field.type.lengthField) {
                cleanField.length = field.length;
            }
            
            if (field.type.decimalLengthField) {
                cleanField.decimalLength = field.decimalLength;
            }
            
            if (field.type.unsignable) {
                cleanField.unsigned = !!field.unsigned;
            }
            
            if (field.type.zerofillable) {
                cleanField.zerofill = !!field.zerofill;
            }
            
            cleanField.hasDefaultValue = !!field.hasDefaultValue;
            if (cleanField.hasDefaultValue) {
                output.defaultValue = field.defaultValue;
            }
            
            output.fields.push(cleanField);
        }
        
        return output;
    };
    
    return Model;
}]);