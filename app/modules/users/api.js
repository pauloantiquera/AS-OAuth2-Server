(function() {
  function usersModuleApi(appConfig, dbHandler) {
    var usersController = require('./controller')(appConfig, dbHandler);
    var usersCrudApi = require(appConfig.app.modules + '/apiutils/genericCrudApi')(usersController);

    return usersCrudApi;
  }

  module.exports = usersModuleApi;
})();