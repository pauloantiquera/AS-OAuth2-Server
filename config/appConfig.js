(function() {
  function getAppConfig(){
    var envTypes = require('./envTypes');
    var env = process.env.NODE_ENV || envTypes.development;
    var appConfig = require('./envConfig.factory').call({}, env);

    return appConfig;
  };
    
  module.exports = getAppConfig;
})();
