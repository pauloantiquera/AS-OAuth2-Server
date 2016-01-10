(function() {
  var path = require('path');
  var envTypes = require('./envTypes');  

  function EnvConfigFactory(envType) {
    var rootPath = path.normalize(__dirname + '/..');
    var configPath = rootPath + '/config';
    var appPath = rootPath + '/app';
    var modulesPath = rootPath + '/app/modules';
    var dbms = 'mongodb';
    var env = {};
    
    env[envTypes.development] = {
      root: rootPath,
      config: configPath,
      app: {
        name: 'dev-oauth2-server',
        path: appPath,
        modules: modulesPath
      },
      port: 3000,
      db: {
        name: dbms,
        url: 'mongodb://localhost/oauth2-server-development'
      }
    };

    env[envTypes.test] = {
      root: rootPath,
      config: configPath,
      app: {
        name: 'test-oauth2-server',
        path: appPath,
        modules: modulesPath
      },
      port: 3000,
      db: {
        name: dbms,
        url: 'mongodb://localhost/oauth2-server-test'
      }
    };

    env[envTypes.production] = {
      root: rootPath,
      config: configPath,
      app: {
        name: 'oauth2-server',
        path: appPath,
        modules: modulesPath
      },
      port: 3000,
      db: {
        name: dbms,
        url: 'mongodb://localhost/oauth2-server-production'
      }
    };

    return env[envType];
  };

  module.exports = EnvConfigFactory;
})();
