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
		this.allowNull = false;
		
		//TODO remove
		this.fields.push({ name: 'name', type: Model.constants.dataTypes[0], length: '10', allowNull: false });
	};
	
	Model.constants = {};
	Model.constants.dataTypes = [
		{ name: "STRING", lengthField: true },
		{ name: "INTEGER", lengthField: true, unsignable: true, zerofillable: true },
		{ name: "BIGINT", lengthField: true, unsignable: true, zerofillable: true },
		{ name: "FLOAT", lengthField: true, decimalLengthField: true, unsignable: true, zerofillable: true },
		{ name: "DECIMAL", lengthField: true, decimalLengthField: true },
		{ name: "DATE", isDate: true },
		{ name: "BOOLEAN" },
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
	}
	
	Model.prototype.toggleActive = function() {
		this.active = !this.active;
	}
	
	Model.prototype.addNewField = function() {
		this.fields.push({ name: '', type: Model.constants.dataTypes[0], length: '' });
	}
	
	Model.prototype.removeField = function(index) {
		this.fields.splice(index, 1);
	}
	
	return Model;
}]);