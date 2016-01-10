'use strict'

describe('Model Builder Unit Test Spec', function() {

  describe('modelBuilder module spec', function() {
    it('modelBuilder module must return a function', function() {
      var modelBuildrFunction = require('../modelBuilder');

      expect(modelBuildrFunction).toEqual(jasmine.any(Function));
    });

    it('modelBuilder module should throw an erro if a dbHandler was not provided', function() {
      var modelBuilder = require('../modelBuilder');

      expect(modelBuilder).toThrow('A dbHandler must be provided.');
    });    
  })

  describe('modelBuilder function spec', function() {
    var $modelBuilder;
    var $dbHandler = {};

    beforeEach(function() {
      $modelBuilder = require('../modelBuilder')($dbHandler);
    });

    it('modelBuilder Object must expose a function withThisSchema', function() {
      expect($modelBuilder.withThisSchema).toEqual(jasmine.any(Function));
    });

    it('modelBuilder Object must expose a function withThisField', function() {
      expect($modelBuilder.withThisField).toEqual(jasmine.any(Function));
    });

    it('modelBuilder Object must expose a function build', function() {
      expect($modelBuilder.build).toEqual(jasmine.any(Function));
    });

    it('withThisField must return its own modelBuilder instance', function() {
      var fieldName = 'fieldName';
      var fieldType = String;

      var returnedModelBuilder = $modelBuilder.withThisField(fieldName, fieldType);

      expect(returnedModelBuilder).toEqual($modelBuilder);
    });

    it('withThisSchema must return its own modelBuilder instance', function() {
      var schema = {
        fieldName: String
      };

      var returnedModelBuilder = $modelBuilder.withThisSchema(schema);

      expect(returnedModelBuilder).toEqual($modelBuilder);
    });

    it('build function must throw an Error if was invoked before withThis*', function() {
      expect($modelBuilder.build).toThrow('A schema must be defined before build a model (use withThisSchema(schemaJson) or withThisField(fieldName, fieldType))');
    });

    it('build function must invoke dbHandler.createModel function with the given schema and model name', function() {
      var schema = {
        fieldName: String
      };
      var modelName = 'modelName';

      $dbHandler.createModel = jasmine.createSpy('createModel');

      $modelBuilder
        .withThisSchema(schema)
        .build(modelName);

      expect($dbHandler.createModel).toHaveBeenCalledWith(modelName, schema);
    });

    it('build function must invoke dbHandler.createModel with schema create by withThisField function', function() {
      var numberFieldName = 'numberFieldName';
      var numberFieldType = Number;
      var stringFieldName = 'stringFieldName';
      var stringFieldType = String;
      var expectedSchema = {
        numberFieldName: Number,
        stringFieldName: String
      };
      var modelName = 'fieldBaseModelName';

      $dbHandler.createModel = jasmine.createSpy('createModel');      

      $modelBuilder
        .withThisField(numberFieldName, numberFieldType)
        .withThisField(stringFieldName, stringFieldType)
        .build(modelName);

      expect($dbHandler.createModel).toHaveBeenCalledWith(modelName, expectedSchema);
    });

    it('build function should return what dbHandler.createModel returns', function() {
      var schema = {
        fieldName: String
      };
      var modelName = 'modelName';
      var expectedReturnValue = new Date();

      $dbHandler.createModel = function() {};
      
      spyOn($dbHandler, 'createModel').andReturn(expectedReturnValue);

      var returnedValue = $modelBuilder
        .withThisSchema(schema)
        .build(modelName);

      expect(returnedValue).toEqual(expectedReturnValue);
    });
  });
});
