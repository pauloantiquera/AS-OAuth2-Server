(function() {
  'use strict';

  angular
    .module('GenCrud')
    .controller('genCrudListController', genCrudListController);

  genCrudListController.$inject = [
    '$resource',
    '$uibModal'
  ];

  /* @ngInject */
  function genCrudListController($resource, $uibModal) {
    /* Private Attributes Declaration */
    var self = this;
    var crudResource;
    var defaultMainActions = {
      C: {name: 'create', glyphIcon: 'plus', btn: 'primary', text: 'New', fn: createItem}
    };
    var defaultItemActions = {
      R: {name: 'retrieve', glyphIcon: 'eye-open', btn: 'default', fn: showItem},
      U: {name: 'update', glyphIcon: 'edit', btn: 'warning', fn: updateItem},
      D: {name: 'delete', glyphIcon: 'trash', btn: 'danger',  fn: deleteItem}
    };
    /* ****************************** */

    /* Public Attributes Declaration */
    self.itemList = [];
    self.mainActions = [];
    self.itemActions = [];
    /* ***************************** */

    /* Private Methods Declaration */
    function createCrudResource() {
      var resourceConfig = {
        'update': {method: 'PUT'}
      };

      return $resource(self.apiUrl + '/:id', {id: '@_id'}, resourceConfig);
    };

    function fillCrudListSuccess(itemListData) {
      self.itemList = itemListData;
    };

    function fillCrudList() {
      crudResource.query()
        .$promise
          .then(fillCrudListSuccess);
    };

    function getModalConfig() {
      return {
        animation: true,
        templateUrl: 'app/gencrud/genCrudForm.template.html',
        controller: 'genCrudFormController as crudFormCtrl',
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      };
    };

    function createDefaultModalConfig() {
      return {
        title: function() {
          return self.title;
        },
        model: function() {
          return self.model;
        }
      };
    }

    function openModalForCreating(item) {
      var modalConfig = getModalConfig();

      modalConfig.resolve = createDefaultModalConfig();
      modalConfig.resolve.item = function() {
          return item;
      };
      modalConfig.resolve.readOnlyMode = function() {
          return false;
      };

      return $uibModal.open(modalConfig);
    };

    function openModalForEditing(item) {
      var modalConfig = getModalConfig();

      modalConfig.resolve = createDefaultModalConfig();
      modalConfig.resolve.item = function() {
          return item.$get();
      };
      modalConfig.resolve.readOnlyMode = function() {
          return false;
      };

      return $uibModal.open(modalConfig);
    };

    function openModalInReadOnlyMode(item) {
      var modalConfig = getModalConfig();

      modalConfig.resolve = createDefaultModalConfig();
      modalConfig.resolve.item = function() {
        return item.$get();
      };
      modalConfig.resolve.readOnlyMode = function() {
        return true;
      };

      return $uibModal.open(modalConfig);
    };

    function saveCreatedItem(item) {
      item.$save();
      self.itemList.push(item);
    };

    function saveEditedItem(item) {
      item.$update();
    };

    function discardChanges(item) {
      try {
        item.$get();
      } catch(error) {
        console.log(error);
        fillCrudList();
      }
    };

    function createItem() {
      var item = new crudResource();
      var modalInstance = openModalForCreating(item);

      modalInstance
        .result
          .then(
            saveCreatedItem
          );
    };

    function prepareActionsWithDefaults(actions, defaultActions) {
      var actionArray = actions.split('');
      var resultActionsArray = [];

      angular.forEach(actionArray, function(value) {
        var action = defaultActions[value.toUpperCase()];
        if (action) {
          resultActionsArray.push(action);
        }
      });

      return resultActionsArray;
    };
    
    function prepareMainActionsWithDefaults() {
      self.mainActions = prepareActionsWithDefaults(self.actions, defaultMainActions);
    };

    function prepareItemActionsWithDefaults() {
      self.itemActions = prepareActionsWithDefaults(self.actions, defaultItemActions);
    };

    function showItem(item) {
      var modalInstance = openModalInReadOnlyMode(item);
    };
    
    function updateItem(item) {
      var modalInstance = openModalForEditing(item);

      modalInstance
        .result
          .then(
            saveEditedItem,
            discardChanges
          );
    };

    function deleteItem(item) {
      item.onRemovingMode = true;
    };
    /* *************************** */

    /* Public Methods Declaration */
    self.hasMainActions = function() {
      return self.mainActions.length > 0;
    };

    self.hasItemActions = function() {
      return self.itemActions.length > 0;
    };

    self.remove = function(item) {
      item.$remove([], fillCrudList);
    };

    self.takeItemFormRemovingMode = function(item) {
      delete item.onRemovingMode;
    };
    /* ************************** */

    /* Init */
    function initController() {
      crudResource = createCrudResource();
      prepareMainActionsWithDefaults();
      prepareItemActionsWithDefaults();
      fillCrudList();
    };

    initController();          
    /* **** */
  }
})();