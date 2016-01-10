(function() {
  var configPath = './config';
  var express = require('express');
  var appConfig = require(configPath + '/appConfig')();
  var dbContext = require(configPath + '/dbHandler')(appConfig.db);

  function openDbConnection() {
    dbContext.connect(
      function(errorReason) {
        throw new Error(errorReason);    
      },
      function(message) {
        console.log(message);        
      }
    );
  };

  function configureApp() {
    var app = express();
    require(configPath + '/expressConfig')(app, appConfig, dbContext);

    return app;
  };

  function runApp(app) {
    app.listen(appConfig.port, function () {
      console.log('OAuth2 server listening on port ' + appConfig.port);
    });

    process.on('SIGINT', function() {
      dbContext.close(function() {
          process.exit(0);
      });
    });
  };

  function initApp() {
    openDbConnection();
    var app = configureApp();
    runApp(app);
  };

  initApp();
})();
