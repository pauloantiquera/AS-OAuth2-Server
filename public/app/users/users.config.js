(function() {
    'use strict';

    angular
        .module('Users')
        .config(usersConfig)
        .constant('usersDefaultState', '/users')
        .constant('usersApiUrl', 'http://localhost:3000/users');

    usersConfig.$inject = [
      '$stateProvider'
    ];

    function usersConfig($stateProvider) {
      $stateProvider
        .state('users', {
          url: '/users',
          controller: 'usersListController as usersListCtrl',
          templateUrl: '/app/users/usersList.html'
        });
    };
})();