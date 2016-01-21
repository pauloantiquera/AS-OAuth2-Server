(function() {
  var express = require('express');

  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var bodyParser = require('body-parser');
  var compress = require('compression');
  var methodOverride = require('method-override');

  function expressConfig(app, appConfig, dbHandler) {
    var applicationsModule = require(appConfig.app.modules + '/applications/api')(appConfig, dbHandler);
    var usersModule = require(appConfig.app.modules + '/users/api')(appConfig, dbHandler);    

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(compress());
    
    app.use('/', express.static(appConfig.root + '/public'));
    app.use('/applications', applicationsModule);
    app.use('/users', usersModule);

    app.use(methodOverride());

    app.use(function(request, response, nextMiddleware) {
      var error = new Error('Not Found');
      error.status = 404;
      nextMiddleware(error, request, response);
    });

    app.use(function(error, request, response, nextMiddleware) {
      response.status(error.status || 500).send(error.message).end();
    });
  };

  module.exports = expressConfig;
})();
