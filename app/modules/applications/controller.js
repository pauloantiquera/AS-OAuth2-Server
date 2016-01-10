(function() {
  function applicationsModuleController(appConfig, dbHandler) {
    var applicationsModel = require('./model')(appConfig, dbHandler);

    function doListAll(requisition, response) {
      var query = {};
      
      applicationsModel.find(query, function(error, data) {
        if (error) {
          return response.status(500).send(error).end();
        }

        return response.status(200).send(data).end();
      });
    };

    function generateABust() {
      var date = new Date();
      return date.getTime();
    };

    function generateClientId() {
      return 'THISISACLIENTID' + generateABust();
    };

    function generateClientSecret() {
      return 'THISISACLIENTSECRET' + generateABust();
    };

    function doCreate(requisition, response) {
      var data = requisition.body;

      data.clientId = generateClientId();
      data.clientSecret = generateClientSecret();
      
      var newApplication = new applicationsModel(data);

      newApplication.save(function(error, data) {
        if (error) {
          return response.status(500).send(error).end();
        }

        return response.status(201).send(data).end();
      });
    };

    function doRetrieve(requisition, response) {
      var query = {_id: requisition.params.id};

      applicationsModel.findOne(query, function(error, data) {
        if (error) {
          return response.status(400).send(error).end();
        }

        return response.status(200).send(data).end();
      });
    };

    function doUpdate(requisition, response) {
      var query = {_id: requisition.params.id};

      var update = requisition.body;

      applicationsModel.update(query, update, function(error, data) {
        if (error) {
          return response.status(400).send(error).end();
        }

        return response.status(200).send(data).end();
      });
    };

    function doDelete(requisition, response) {
      var query = {_id: requisition.params.id};

      applicationsModel.remove(query, function(error, data) {
        if (error) {
          return response.status(400).send(error).end();
        }

        return response.status(200).send(data).end();
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