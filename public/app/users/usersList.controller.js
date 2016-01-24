(function() {
    'use strict';

    angular
        .module('Users')
        .controller('usersListController', usersListController);

    usersListController.$inject = [
      'usersApiUrl'
    ];

    /* @ngInject */
    function usersListController(usersApiUrl) {
        /* Private Attributes Declaration */
        var self = this;
        /* ****************************** */

        /* Public Attributes Declaration */
        self.title = 'Users';
        self.userModel = [
          {name: 'login', type: 'text',label: 'Login', access: 'rw'},
          {name: 'fullName', type: 'text',label: 'Name', access: 'rw'},
          {name: 'active', type: 'bool',label: 'Active', access: 'r'},
          {name: 'created', type: 'date',label: 'Created', access: 'r'},
          {name: 'lastLogin', type: 'date',label: 'Last Login', access: 'r'}
        ];
        self.usersApiUrl = usersApiUrl;
        /* ***************************** */

        /* Private Methods Declaration */
        /* *************************** */

        /* Public Methods Declaration */
        /* ************************** */

        /* Init */
        function initController() {
        }

        initController();
        /* **** */
    }
})();