(function() {
    'use strict';

    angular
        .module('GenCrud')
        .directive('genCrud', genCrudDirective);

    /* @ngInject */
    function genCrudDirective() {
        // Usage:
        // <gen-crud title="Users List" model-object="{}" default-actions="CRUD" api-url="" options-object="{}">
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: 'genCrudListController as crudListCtrl',
            restrict: 'E',
            templateUrl: 'app/gencrud/genCrudList.template.html',
            scope: {
              title: '@',
              model: '=modelObject',
              actions: '@defaultActions',
              apiUrl: '@',
              options: '=optionsObject'
            }
        };
        
        return directive;
    };
})();