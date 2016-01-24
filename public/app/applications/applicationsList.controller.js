(function() {
    'use strict';

    angular
        .module('Applications')
        .controller('applicationsListController', applicationsListController);

    applicationsListController.$inject = [
      'applicationsApiUrl'
    ];

    /* @ngInject */
    function applicationsListController(applicationsApiUrl) {
        /* Private Attributes Declaration */
        var self = this;
        /* ****************************** */

        /* Public Attributes Declaration */
        self.title = 'Applications';
        self.applicationModel = [
          {name: 'appName', type: 'text',label: 'App Name', access: 'rw'},
          {name: '_id', type: 'text',label: 'App Id', access: 'r'},
          {name: 'clientId', type: 'text',label: 'Client Id', access: 'r'},
          {name: 'clientSecret', type: 'text',label: 'Client Secret', access: 'r'}
        ];
        self.applicationsApiUrl = applicationsApiUrl;
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