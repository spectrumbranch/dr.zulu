angular.module('zuluApp.model', []).factory('Model', [function ModelFactory() {
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
        
        //TODO remove
        this.fields.push({ name: 'name', type: Model.constants.dataTypes[0], length: '10', allowNull: false });
    };
    
    Model.constants = {};
    Model.constants.dataTypes = [
        { name: "STRING", lengthField: true, isText: true },
        { name: "INTEGER", lengthField: true, unsignable: true, zerofillable: true, isInt: true },
        { name: "BIGINT", lengthField: true, unsignable: true, zerofillable: true, isInt: true },
        { name: "FLOAT", lengthField: true, decimalLengthField: true, unsignable: true, zerofillable: true, isDecimal: true },
        { name: "DECIMAL", lengthField: true, decimalLengthField: true, isDecimal: true },
        { name: "DATE", isDate: true },
        { name: "BOOLEAN", isBool: true },
        { name: "ENUM", isEnum: true }
    ];
    
    Model.constants.getDataTypeByObject = function(input) {
        var output = {};
        for (var i = 0; i < Model.constants.dataTypes.length; i++) {
            if (input.name == Model.constants.dataTypes[i].name) {
                output = Model.constants.dataTypes[i];
                break;
            }
        }
        return output;
    };
    
    Model.prototype.toggleEditMode = function() {
        this.editMode = !this.editMode;
    };
    
    Model.prototype.toggleActive = function() {
        this.active = !this.active;
    };
    
    Model.prototype.addNewField = function() {
        this.fields.push({ name: '', type: Model.constants.dataTypes[0], length: '' });
    };
    
    Model.prototype.removeField = function(index) {
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