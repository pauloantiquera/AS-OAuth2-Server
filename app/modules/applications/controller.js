(function() {
  function applicationsModuleController(appConfig, dbHandler) {
    var uidGenerator = require('uid');
    var applicationsModel = require('./model')(appConfig, dbHandler);
    var responseHandler = require(appConfig.app.modules + '/apiutils/responseHandler');
    var uidLength = 32;

    function doListAll(request, response, next) {
      var query = {};

      applicationsModel.find(query, function(error, data) {
        responseHandler(error, request, response, data);        
      });
    };

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
      var data = request.body;

      data.clientId = generateClientId();
      data.clientSecret = generateClientSecret();
      
      var newApplication = new applicationsModel(data);

      newApplication.save(function(error, data) {
        responseHandler(error, request, response, data);
      });
    };

    function doRetrieve(request, response) {
      var query = {_id: request.params.id};

      applicationsModel.findOne(query, function(error, data) {
        if (!error && !data) {
          error = {
            status: 404,
            message: 'Not found'
          };
        }
        responseHandler(error, request, response, data);
      });
    };

    function doUpdate(request, response) {
      var query = {_id: request.params.id};

      var update = request.body;

      applicationsModel.update(query, update, function(error, data) {
        responseHandler(error, request, response, data);
      });
    };

    function doDelete(request, response) {
      var query = {_id: request.params.id};

      applicationsModel.remove(query, function(error, data) {
        responseHandler(error, request, response, data);
      });
    };

    var controller = {
      listAll: doListAll,
      create: doCreate,
      retrieve: doRetrieve,
      update: doUpdate,
      delete: doDelete
    };

    return controller;

  };

  module.exports = applicationsModuleController;
})();