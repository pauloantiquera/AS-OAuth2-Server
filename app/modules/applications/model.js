(function() {
  function getApplicationsModel(appConfig, dbHandler) {
    var modelBuilder = require(appConfig.app.modules + '/dbutils/modelBuilder')(dbHandler);

    var applicationsModel = modelBuilder
      .withThisField('appName', String)
      .withThisField('clientId', String)
      .withThisField('clientSecret', String)
      .build('ApplicationsModel');

    return applicationsModel;
  }  

  module.exports = getApplicationsModel;
})();
