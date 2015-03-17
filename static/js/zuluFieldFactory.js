angular.module('zuluApp.field', []).factory('Field', [function FieldFactory() {
    //Constructor
    var Field = function(input) {
        //input fields
        this.name = input.name;
        this.type = input.type;
        this.length = input.length;
        
        this.allowNull = !!input.allowNull;
        
        if (typeof input.defaultValue != undefined) {
            this.defaultValue = input.defaultValue;
        } else {
            this.defaultValue = "";
        }
        this.hasDefaultValue = !!input.hasDefaultValue;
    };
    
    Field.constants = {};
    Field.constants.dataTypes = [
        { name: "STRING", lengthField: true, isText: true },
        { name: "INTEGER", lengthField: true, unsignable: true, zerofillable: true, isInt: true },
        { name: "BIGINT", lengthField: true, unsignable: true, zerofillable: true, isInt: true },
        { name: "FLOAT", lengthField: true, decimalLengthField: true, unsignable: true, zerofillable: true, isDecimal: true },
        { name: "DECIMAL", lengthField: true, decimalLengthField: true, isDecimal: true },
        { name: "DATE", isDate: true, custom: true },
        { name: "BOOLEAN", isBool: true, custom: true },
        { name: "ENUM", isEnum: true, custom: true }
    ];
    
    Field.constants.date = {
        dateOptions: {
            formatYear: 'yy',
            startingDay: 1
        },
        formats: ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
    };
    
    Field.constants.date.format = Field.constants.date.formats[1]
    
    Field.constants.getDataTypeByObject = function(input) {
        var output = {};
        for (var i = 0; i < Field.constants.dataTypes.length; i++) {
            if (input.name == Field.constants.dataTypes[i].name) {
                output = Field.constants.dataTypes[i];
                break;
            }
        }
        return output;
    };
    
    //DATES ONLY
    //for defaultValue -- TODO rename these so it makes sense for defaultValue
    Field.prototype.today = function() {
        this.defaultValue = new Date();
    };
    
    Field.prototype.clear = function () {
        this.defaultValue = null;
    };

    // Disable weekend selection
    Field.prototype.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    Field.prototype.toggleMin = function() {
        this.minDate = this.minDate ? null : new Date();
    };

    Field.prototype.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        this.opened = true;
    };
  
    
    return Field;
}]);