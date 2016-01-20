(function() {
    'use strict';

    angular
        .module('Applications')
        .config(applicationsConfig)
        .constant('applicationsDefaultState', '/applications')
        .constant('applicationsApiUrl', 'http://localhost:3000/applications');

    applicationsConfig.$inject = [
      '$stateProvider'
    ];

    function applicationsConfig($stateProvider) {
      $stateProvider
        .state('applications', {
          url: '/applications',
          controller: 'applicationsListController as appListCtrl',
          templateUrl: '/app/applications/applicationsList.html'
        });      
    };
})();