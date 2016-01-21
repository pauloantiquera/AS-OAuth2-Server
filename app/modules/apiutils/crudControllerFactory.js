(function() {
  function crudControllerFactory(model, responseHandler) {

    function doListAll(request, response, next) {
      var query = {};

      model.find(query, function(error, data) {
        responseHandler(error, request, response, data);
      });
    };

    function doCreate(request, response, next) {
      var data = request.body;
      
      var newModel = new model(data);

      newModel.save(function(error, data) {
        responseHandler(error, request, response, data);
      });
    };

    function doRetrieve(request, response, next) {
      var query = {_id: request.params.id};

      model.findOne(query, function(error, data) {
        if (!error && !data) {
          error = {
            status: 404,
            message: 'Not found'
          };
        }
        responseHandler(error, request, response, data);
      });
    };

    function doUpdate(request, response, next) {
      var query = {_id: request.params.id};

      var update = request.body;

      model.update(query, update, function(error, data) {
        responseHandler(error, request, response, data);
      });
    };

    function doDelete(request, response) {
      var query = {_id: request.params.id};

      model.remove(query, function(error, data) {
        responseHandler(error, request, response, data);
      });
    };

    var crudController = {
      listAll: doListAll,
      create: doCreate,
      retrieve: doRetrieve,
      update: doUpdate,
      delete: doDelete
    };

    return crudController;
  };

  module.exports = crudControllerFactory;
})();