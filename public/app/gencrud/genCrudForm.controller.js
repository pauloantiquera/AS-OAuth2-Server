(function() {
    'use strict';

    angular
        .module('GenCrud')
        .controller('genCrudFormController', genCrudFormController);

    genCrudFormController.$inject = [
      '$uibModalInstance', 
      'model', 
      'item',
      'title',
      'readOnlyMode'
    ];

    /* @ngInject */
    function genCrudFormController($uibModalInstance, model, item, title, readOnlyMode) {
        /* Private Attributes Declaration */
        var self = this;
        /* ****************************** */

        /* Public Attributes Declaration */
        self.title = title;
        self.model = model;
        self.item = item;
        /* ***************************** */

        /* Private Methods Declaration */

        /* *************************** */

        /* Public Methods Declaration */
        self.save = function() {
          $uibModalInstance.close(self.item);
        };

        self.cancel = function() {
          $uibModalInstance.dismiss(self.item);
        };

        self.isReadWrite = function(field) {
          return field.access.toLowerCase() === 'rw' && !readOnlyMode;
        };

        self.isStaticAndVisible = function(field) {
          return !self.isReadWrite(field) && self.item[field.name];
        };

        self.isVisible = function(field) {
          return self.isReadWrite(field) || self.isStaticAndVisible(field);
        };
        /* ************************** */

        /* Init */
        function initController() {
        }

        initController();
        /* **** */
    }
})();
