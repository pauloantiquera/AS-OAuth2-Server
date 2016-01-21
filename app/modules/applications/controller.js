(function() {
  function applicationsModuleController(appConfig, dbHandler) {
    var uidGenerator = require('uid');
    var applicationsModel = require('./model')(appConfig, dbHandler);
    var responseHandler = require(appConfig.app.modules + '/apiutils/responseHandler');
    var crudController = require(appConfig.app.modules + '/apiutils/crudControllerFactory')(applicationsModel, responseHandler);

    var uidLength = 32;

    function generateUID() {
      return uidGenerator(uidLength);
    };

    function generateClientId() {
      return generateUID();
    };

    function generateClientSecret() {
      return generateUID();
    };

    function doCreate(request, response, next) {
      request.body.clientId = generateClientId();
      request.body.clientSecret = generateClientSecret();
      
      crudController.create(request, response, next);
    };    

    var controller = {
      listAll: crudController.listAll,
      create: doCreate,
      retrieve: crudController.retrieve,
      update: crudController.update,
      delete: crudController.delete
    };

    return controller;
  };

  module.exports = applicationsModuleController;
})();