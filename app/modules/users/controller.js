(function() {
  function usersModuleController(appConfig, dbHandler) {
    var usersModel = require('./model')(appConfig, dbHandler);
    var responseHandler = require(appConfig.app.modules + '/apiutils/responseHandler');
    var usersCrudController = require(appConfig.app.modules + '/apiutils/crudControllerFactory')(usersModel, responseHandler);

    return usersCrudController;
  };

  module.exports = usersModuleController;
})();