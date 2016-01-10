(function() {
  function modelBuilder(dbHandler) {
    var _modelBuilder;
    var schema;

    if(!dbHandler) {
      throw new Error('A dbHandler must be provided.');
    }

    function setSchema(schemaJson) {
      schema = schemaJson;

      return _modelBuilder;
    };

    function addField(fieldName, fieldType) {
      if (!schema) {
        schema = {};
      }
      schema[fieldName] = fieldType;

      return _modelBuilder;
    };

    function buildModel(modelName) {
      if(!schema) {
        throw new Error('A schema must be defined before build a model (use withThisSchema(schemaJson) or withThisField(fieldName, fieldType))');
      }

      return dbHandler.createModel(modelName, schema);
    };

    _modelBuilder = {
      withThisSchema: setSchema,
      withThisField: addField,
      build: buildModel
    };

    return _modelBuilder;
  }

  module.exports = modelBuilder;
})();