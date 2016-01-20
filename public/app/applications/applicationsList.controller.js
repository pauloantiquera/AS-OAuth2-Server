(function() {
    'use strict';

    angular
        .module('Applications')
        .controller('applicationsListController', applicationsListController);

    applicationsListController.$inject = [
      'applicationsApiUrl',
      '$resource',
      '$uibModal'
    ];

    /* @ngInject */
    function applicationsListController(applicationsApiUrl, $resource, $uibModal) {
        /* Private Attributes Declaration */
        var self = this;
        var applicationsResource;
        /* ****************************** */

        /* Public Attributes Declaration */
        self.title = 'Applications List';
        self.applicationsList = [];
        /* ***************************** */

        /* Private Methods Declaration */
        function createAplicationsResource() {
          var resourceConfig = {
            'update' : {method: 'PUT'}
          };

          return $resource(applicationsApiUrl + '/:id',{id:'@_id'}, resourceConfig);
        };

        function fillApplicationsListSuccess(applicationsListData) {
          self.applicationsList = applicationsListData;
        };

        function fillApplicationsList() {
          applicationsResource.query()
            .$promise
              .then(
                fillApplicationsListSuccess
              );
        };

        function getModalConfig() {
          return {
            animation: true,
            templateUrl: 'app/applications/applicationForm.html',
            controller: 'applicationFormController as appFormCtrl',
            size: 'lg',
            backdrop: 'static',
            keyboard: false
          };
        };

        function openModalForEditing(application) {
          var modalConfig = getModalConfig();
          
          modalConfig.resolve = {
            application: function() {
              return application.$get();
            }
          };

          return $uibModal.open(modalConfig);
        };

        function openModalForCreating(application) {
          var modalConfig = getModalConfig();

          modalConfig.resolve = {
            application: function() {
              return application;
            }
          };

          return $uibModal.open(modalConfig);
        };

        function saveEditedApplication(application) {
          application.$update();

        };

        function discardChanges(application) {
          application.$get();
        };

        function saveCreatedApplication(application) {
          application.$save();
          self.applicationsList.push(application);
        };
        /* *************************** */

        /* Public Methods Declaration */
        self.editApplication = function(application) {
          var modalInstance = openModalForEditing(application);

          modalInstance
            .result
              .then(
                saveEditedApplication,
                discardChanges
              );
        };

        self.createApplication = function() {
          var application = new applicationsResource();
          var modalInstance = openModalForCreating(application);

          modalInstance
            .result
              .then(
                saveCreatedApplication
              );
        };
        /* ************************** */

        /* Init */
        function initController() {
          applicationsResource = createAplicationsResource();
          fillApplicationsList();
        }

        initController();
        /* **** */
    }
})();