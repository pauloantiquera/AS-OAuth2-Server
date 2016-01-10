(function() {
  var express = require('express');

  function applicationsModuleApi(appConfig, dbHandler) {
    var apiRouter = express.Router();

    var applicationsController = require('./controller.js')(appConfig, dbHandler);

    apiRouter.get('/', applicationsController.listAll);
    apiRouter.get('/:id', applicationsController.retrieve);
    apiRouter.post('/', applicationsController.create);
    apiRouter.put('/:id', applicationsController.update);
    apiRouter.delete('/:id', applicationsController.delete);

    return apiRouter;
  };

  module.exports = applicationsModuleApi;
})();
