(function() {
  function applicationsModuleApi(appConfig, dbHandler) {
    var applicationsController = require('./controller')(appConfig, dbHandler);
    var applicationsCrudApi = require(appConfig.app.modules + '/apiutils/genericCrudApi')(applicationsController);

    return applicationsCrudApi;
  };

  module.exports = applicationsModuleApi;
})();
