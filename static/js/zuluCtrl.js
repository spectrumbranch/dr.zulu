angular.module('zuluApp', ['zuluApp.model']).controller('ZuluController', ['$scope', 'Model', function($scope, Model) {
    //maybe rename or reorganize this variable
    $scope.constants = Model.constants;
    
    $scope.constants.associationTypes = [
        { id: 0, name: 'hasOne' },
        { id: 1, name: 'belongsTo' },
        { id: 2, name: 'hasMany' }
    ];

    $scope.currentProject = { name: 'Cartography', id: 0, editModel: false };
    $scope.currentProject.toggleEditMode = function() {
        $scope.currentProject.editMode = !$scope.currentProject.editMode;
    }
    $scope.currentProject.addNewModel = function() {
        var id = $scope.currentProject.models.length; //TODO temporary id situation
        $scope.currentProject.models.push(new Model({ name: 'NewModel' + id, id: id }));
    }
    $scope.currentProject.models = [];
    //TODO remove after development/testing. models should default to none
    $scope.currentProject.models.push(new Model({ name: 'Map', id: 0 }));
    $scope.currentProject.models.push(new Model({ name: 'Tile', id: 1 }));
    
    $scope.currentProject.associations = [];
    //TODO remove after development/testing. associations should default to none
    $scope.currentProject.associations.push({ sourceModel: $scope.currentProject.models[0], targetModel: $scope.currentProject.models[1], associationType: $scope.constants.associationTypes[2] });
    $scope.currentProject.associations.push({ sourceModel: $scope.currentProject.models[1], targetModel: $scope.currentProject.models[0], associationType: $scope.constants.associationTypes[1] });
    
    $scope.currentProject.showAssociations = true;
    $scope.currentProject.toggleShowAssociations = function() {
        $scope.currentProject.showAssociations = !$scope.currentProject.showAssociations;
    }
    $scope.currentProject.removeAssociation = function(index) {
        $scope.currentProject.associations.splice(index, 1);
    }
    $scope.currentProject.addNewAssociation = function() {
        $scope.currentProject.associations.push({ sourceModel: {}, targetModel: {}, associationType: {} });
    }
    
    $scope.toJson = function() {
        var cleanProject = {};
        cleanProject.name = $scope.currentProject.name;
        cleanProject.models = [];
        for (var i = 0; i < $scope.currentProject.models.length; i++) {
            cleanProject.models.push($scope.currentProject.models[i].getCleanRepresentation());
        }
        console.log(cleanProject);
    }
}]);