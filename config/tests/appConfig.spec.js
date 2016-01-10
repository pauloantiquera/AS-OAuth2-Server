'use strict'

describe('App Config Test Suite',function() {

  it('App Config must return a valid Javascript Object', function() {
    var appConfig = require('../appConfig')();
    expect(appConfig).toEqual(jasmine.any(Object));
  });

  it('Config object returned must have a complete structure', function() {
    var appConfig = require('../appConfig')();

    expect(appConfig.root).toEqual(jasmine.any(String));
    expect(appConfig.app).toEqual(jasmine.any(Object));
    expect(appConfig.port).toEqual(jasmine.any(Number));
    expect(appConfig.db).toEqual(jasmine.any(Object));
  });

  it('app attribute must have a valid structure', function() {
    var app = require('../appConfig')().app;

    expect(app.name).toEqual(jasmine.any(String));
  });

  it('db attribute must have a valid structure (just mongodb is supported)', function() {
    var db = require('../appConfig')().db;
    var supportedDbName = 'mongodb';

    expect(db.name).toEqual(supportedDbName);
    expect(db.url).toEqual(jasmine.any(String));
  });

  it('if process.env.NODE_ENV is not set the appConfig object must be a development config (name: "dev-oauth2-server")', function() {    
    delete process.env.NODE_ENV;
    var appConfig = require('../appConfig')();
    var expectedAppNameValue = 'dev-oauth2-server';

    expect(appConfig.app.name).toEqual(expectedAppNameValue);
  });

  it('if process.env.NODE_ENV is set to test the appConfig object must be a test config (name: "test-oauth2-server")', function() {
    process.env.NODE_ENV = 'test';
    var appConfig = require('../appConfig')();
    var expectedAppNameValue = 'test-oauth2-server';

    expect(appConfig.app.name).toEqual(expectedAppNameValue);
  });

  it('if process.env.NODE_ENV is set to production the appConfig object must be a test config (name: "oauth2-server")', function() {
    process.env.NODE_ENV = 'production';
    var appConfig = require('../appConfig')();
    var expectedAppNameValue = 'oauth2-server';

    expect(appConfig.app.name).toEqual(expectedAppNameValue);
  });
});
