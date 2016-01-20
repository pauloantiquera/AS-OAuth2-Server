(function() {
    'use strict';

    angular
        .module('Applications')
        .controller('applicationFormController', applicationFormController);

    applicationFormController.$inject = [
      '$uibModalInstance', 
      'application'
    ];

    /* @ngInject */
    function applicationFormController($uibModalInstance, application) {
        /* Private Attributes Declaration */
        var self = this;
        /* ****************************** */

        /* Public Attributes Declaration */
        self.title = 'Application Form';
        self.application = application;
        /* ***************************** */

        /* Private Methods Declaration */

        /* *************************** */

        /* Public Methods Declaration */
        self.save = function() {
          $uibModalInstance.close(self.application);
        };

        self.cancel = function() {
          $uibModalInstance.dismiss(self.application);
        };
        /* ************************** */

        /* Init */
        function initController() {
        }

        initController();
        /* **** */
    }
})();