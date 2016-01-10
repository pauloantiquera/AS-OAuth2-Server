'use strict'

describe('DB Handler Test Suite', function() {
  it('dbHandler module must return a function', function() {
    var getDbHandler = require('../dbHandler');
    expect(getDbHandler).toEqual(jasmine.any(Function));
  });

  function getDbHandlerObject() {
    var db = {
      name: 'DriverName',
      url: 'url://to/bd'
    };
    return require('../dbHandler')(db);
  };

  it('dbHandler function must return a Javascript object', function() {
    var dbHandler = getDbHandlerObject();
    expect(dbHandler).toEqual(jasmine.any(Object));
  });

  it('dbHandler object must have a function connect', function() {
    var dbHandler = getDbHandlerObject();
    expect(dbHandler.connect).toEqual(jasmine.any(Function));
  });

  it('connect function must receive an error callback and a success callback as params, these two callback are required and function must throw error if they wont be provided.', function() {
    var dbHandler = getDbHandlerObject();
    var errorCallback = function() {};

    expect(dbHandler.connect).toThrow('An error callback is required {usage: connect(errorCallback,successCallback)}.');
    expect(function() {
      dbHandler.connect(errorCallback)
    }).toThrow('A success callback is required {usage: connect(errorCallback,successCallback)}.');
  });
});