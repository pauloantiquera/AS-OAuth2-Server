(function() {
  function loadMongoose(url) {
    var mongoose = require('mongoose');
    var connection;

    function mongooseConnect(errorCallback, successCallback) {
      mongoose.connect(url);

      connection = mongoose.connection;

      connection.on('error', function() {
        var errorReason = 'Unable to connect to MongoDB at ' + url;
        return errorCallback(errorReason);
      });

      connection.on('connected', function() {
        var message = 'Connected to mongodb at ' + url;
        return successCallback(message);
      });
    };

    function mongooseCloseConnection(callback) {
      if (connection) {
        connection.close(callback);
      }
    };

    function mongooseCreateModel(modelName, schemaDescription) {
      var schema = new mongoose.Schema(schemaDescription);

      return mongoose.model(modelName, schema);
    };

    return {
      connect: mongooseConnect,
      close: mongooseCloseConnection,
      createModel: mongooseCreateModel
    }
  };

  module.exports = loadMongoose;
})();
