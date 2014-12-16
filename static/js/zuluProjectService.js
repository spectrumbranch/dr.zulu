angular.module('zuluApp.project', ['zuluApp.model', 'zuluApp.association']).service('Project', ['Model', 'Association', function ProjectService(Model, Association){
    this.current = null;

    //TODO move everything project related here.
}]);