(function() {
  function DbHandlerFactory(db) {
    if (!db) {
      throw new Error('No db config was provided.');
    }

    var dbDriverName = bulidDbDriverName(db.name);
    var dbDriver = require(dbDriverName)(db.url);

    function bulidDbDriverName(driverName) {
      return './' + driverName;
    }

    function isFunction(fn) {
      return typeof fn === 'function';
    }

    function doConnect(errorCallback, successCallback) {
      if (!isFunction(errorCallback)) {
        throw new Error('An error callback is required {usage: connect(errorCallback,successCallback)}.');
      }

      if (!isFunction(successCallback)) {
        throw new Error('A success callback is required {usage: connect(errorCallback,successCallback)}.'); 
      }

      dbDriver.connect(errorCallback, successCallback);
    };

    function doClose(callback) {
      dbDriver.close(callback);
    };

    function doCreateModel(modelName, schema) {
      if (!modelName || !schema) {
        throw new Error('Model name and schema description are required.');
      }

      return dbDriver.createModel(modelName, schema);
    };

    return {
      connect: doConnect,
      close: doClose,
      createModel: doCreateModel
    };
  }

  module.exports = DbHandlerFactory;
})();
