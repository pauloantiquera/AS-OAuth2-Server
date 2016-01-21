(function() {
    'use strict';

    angular
        .module('Users')
        .controller('usersListController', usersListController);

    usersListController.$inject = [
      'usersApiUrl',
      '$resource',
      '$uibModal'
    ];

    /* @ngInject */
    function usersListController(usersApiUrl, $resource, $uibModal) {
        /* Private Attributes Declaration */
        var self = this;
        var usersResource;
        /* ****************************** */

        /* Public Attributes Declaration */
        self.title = 'Users List';
        self.usersList = [];
        /* ***************************** */

        /* Private Methods Declaration */
        function createUsersResource() {
          var resourceConfig = {
            'update': {method: 'PUT'}
          };

          return $resource(usersApiUrl + '/:id', {id: '@_id'}, resourceConfig);
        };

        function fillUsersListSuccess(usersListData) {
          self.usersList = usersListData;
        };

        function fillUsersList() {
          usersResource.query()
            .$promise
              .then(
                fillUsersListSuccess
              );
        };

        function getModalConfig() {
          return {
            animation: true,
            templateUrl: 'app/users/userForm.html',
            controller: 'userFormController as userFormCtrl',
            size: 'lg',
            backdrop: 'static',
            keyboard: false
          };
        };

        function openModalForEditing(user) {
          var modalConfig = getModalConfig();
          
          modalConfig.resolve = {
            user: function() {
              return user.$get();
            }
          };

          return $uibModal.open(modalConfig);
        };

        function openModalForCreating(user) {
          var modalConfig = getModalConfig();

          modalConfig.resolve = {
            user: function() {
              return user;
            }
          };

          return $uibModal.open(modalConfig);
        };

        function saveEditedUser(user) {
          user.$update();
        };

        function discardChanges(user) {
          try {
            user.$get();
          } catch(error) {
            console.log(error);
            fillUsersList();
          }
        };

        function saveCreatedUser(user) {
          user.$save();
          self.usersList.push(user);
        };
        /* *************************** */

        /* Public Methods Declaration */
        self.editUser = function(user) {
          var modalInstance = openModalForEditing(user);

          modalInstance
            .result
              .then(
                saveEditedUser,
                discardChanges
              );
        };

        self.createUser = function() {
          var user = new usersResource();
          var modalInstance = openModalForCreating(user);

          modalInstance
            .result
              .then(
                saveCreatedUser
              );
        };

        self.removeUser = function(user) {
          user.$remove([],fillUsersList);
        };

        self.putUserOnRemovingMode = function(user) {
          user.onRemovingMode = true;
        };

        self.takeUserFormRemovingMode = function(user) {
          delete user.onRemovingMode;
        };
        /* ************************** */

        /* Init */
        function initController() {
          usersResource = createUsersResource();
          fillUsersList();
        }

        initController();
        /* **** */
    }
})();