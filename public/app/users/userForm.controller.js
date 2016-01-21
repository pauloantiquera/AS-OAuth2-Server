(function() {
    'use strict';

    angular
        .module('Users')
        .controller('userFormController', userFormController);

    userFormController.$inject = [
      '$uibModalInstance',
      'user'
    ];

    /* @ngInject */
    function userFormController($uibModalInstance, user) {
        /* Private Attributes Declaration */
        var self = this;
        /* ****************************** */

        /* Public Attributes Declaration */
        self.title = 'User Form';
        self.user = user;
        /* ***************************** */

        /* Private Methods Declaration */

        /* *************************** */

        /* Public Methods Declaration */
        self.save = function() {
          $uibModalInstance.close(self.user);
        };

        self.cancel = function() {
          $uibModalInstance.dismiss(self.user);
        };       
        /* ************************** */

        /* Init */
        function initController() {
        }

        initController();
        /* **** */
    }
})();