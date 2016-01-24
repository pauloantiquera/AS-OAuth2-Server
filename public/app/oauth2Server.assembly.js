(function() {
    'use strict';

    angular
        .module('oauth2Server.assembly', [
          'Applications',
          'Users',
          'GenCrud',
          'ui.router'
        ])
        .config(oauth2ServerAssemblyConfig);

    oauth2ServerAssemblyConfig.$inject = [
      '$urlRouterProvider',
      'applicationsDefaultState'
    ];

    function oauth2ServerAssemblyConfig($urlRouterProvider, applicationsDefaultState) {
      $urlRouterProvider
        .otherwise(applicationsDefaultState);
    };
})();