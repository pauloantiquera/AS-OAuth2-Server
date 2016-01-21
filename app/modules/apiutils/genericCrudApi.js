(function() {
  var express = require('express');

  function genericCrudApi(controller) {
    var apiRouter = express.Router();
    
    apiRouter.get('/', controller.listAll);
    apiRouter.get('/:id', controller.retrieve);
    apiRouter.post('/', controller.create);
    apiRouter.put('/:id', controller.update);
    apiRouter.delete('/:id', controller.delete);

    return apiRouter;    
  }

  module.exports = genericCrudApi;
})();