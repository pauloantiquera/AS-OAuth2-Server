(function() {
  function getUsersModel(appConfig, dbHandler) {
    var modelBuilder = require(appConfig.app.modules + '/dbutils/modelBuilder')(dbHandler);

    var usersModel = modelBuilder
      .withThisSchema({
        login: String,
        fullName: String,
        password: String,
        active: {type: Boolean, default: true},
        created: {type: Date, default: Date.now},
        lastLogin: {type: Date, default: Date.now}
      })
      .build('user');

    return usersModel;
  };

  module.exports = getUsersModel;
})();