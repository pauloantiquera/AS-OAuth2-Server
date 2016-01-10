(function() {
	function getDbHandler(db) {
    var dbHandler = require('./dbHandler.factory').call({}, db);

    return dbHandler;
  };

  module.exports = getDbHandler;
})();