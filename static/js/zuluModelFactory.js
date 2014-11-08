angular.module('zuluApp.model', []).factory('Model', [function ModelFactory() {
	//Constructor
	var Model = function(input) {
		//input fields
		this.name = input.name;
		this.id = input.id;
		
		//default fields
		this.editMode = false;
		this.fields = [];
		
		//TODO remove
		this.fields.push({ name: 'name', type: Model.constants.dataTypes[0], length: '10', allowNull: false });
	};
	
	Model.constants = {};
	Model.constants.dataTypes = [
		{ name: "STRING" },
		{ name: "INTEGER" },
		{ name: "BIGINT" },
		{ name: "FLOAT" },
		{ name: "DECIMAL" },
		{ name: "DATE" },
		{ name: "BOOLEAN" }
	];
	
	Model.prototype.toggleEditMode = function() {
		this.editMode = !this.editMode;
	}
	
	Model.prototype.addNewField = function() {
		this.fields.push({ name: '', type: Model.constants.dataTypes[0], length: '' });
	}
	
	Model.prototype.removeField = function(index) {
		this.fields.splice(index, 1);
	}
	
	return Model;
}]);