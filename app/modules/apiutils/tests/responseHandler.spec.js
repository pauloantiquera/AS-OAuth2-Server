'use strict'

describe('Response Handler Unit Test Spec', function() {
  describe('responseHandler module', function() {
    it('should return a function', function() {
      var responseHandlerFunction = require('../responseHandler');

      expect(responseHandlerFunction).toEqual(jasmine.any(Function));
    });
  });

  describe('responseHandler function', function() {
    var $responseHandler;
    beforeEach(function() {
      $responseHandler = require('../responseHandler');
    });

    it('should require four arguments (error,request,response, data), errors must be thrown if these arguments are missed (error can be null)', function() {
      var errorObject = {
        message: 'error'
      };
      var requestObject = {};
      var dataObject = {};

      expect($responseHandler).toThrow('An error object must be provided.');

      expect(function() {
        $responseHandler(errorObject)
      }).toThrow('A request object must be provided.');

      expect(function() {
        $responseHandler(errorObject, requestObject)
      }).toThrow('A response object must be provided.');
    });

    it('should verify the message attribute (String) if got a not null error object param', function() {
      var errorObject = {};

      expect(function() {
        $responseHandler(errorObject);
      }).toThrow('Error object should be null or must have a String message.');
    });
  });

  describe('responseHandler error handling', function() {
    var $responseHandler;
    var $response = {
      status: function() {},
      send: function() {},
      end: function() {}
    }
    
    beforeEach(function() {
      $responseHandler = require('../responseHandler');
      spyOn($response, 'status').andReturn($response);
      spyOn($response, 'send').andReturn($response);
      spyOn($response, 'end');
    });

    it('should call response.status() with error.status attribute', function() {
      var errorWithStatus = {
        status: 400,
        message: 'Bad request'
      };
      var request = {};

      $responseHandler(errorWithStatus, request, $response);
      expect($response.status).toHaveBeenCalledWith(errorWithStatus.status);
    });

    it('should call response.status(500) if there is no error.status', function() {
      var errorWithoutStatus = {
        message: 'Internal server error'
      };      
      var request = {};

      $responseHandler(errorWithoutStatus, request, $response);
      expect($response.status).toHaveBeenCalledWith(500);
    });

    it('should call response.send(error.message)', function() {
      var errorWithoutStatus = {
        message: 'Internal server error'
      };      
      var request = {};      

      $responseHandler(errorWithoutStatus, request, $response);
      expect($response.send).toHaveBeenCalledWith(errorWithoutStatus.message);
    });
  });

  describe('responseHandler success handling', function() {    
    var $responseHandler;
    var $error;
    var $response = {
      status: function() {},
      send: function() {},
      location: function() {},
      end: function() {}
    }
    
    beforeEach(function() {
      $responseHandler = require('../responseHandler');
      $error = null;
      spyOn($response, 'status').andReturn($response);
      spyOn($response, 'send').andReturn($response);
      spyOn($response, 'location').andReturn($response);
      spyOn($response, 'end');
    });

    it('should respond a 200 status and send data if request was a GET, PUT or DELETE method', function() {
      var request = {
        method: 'GET'
      };
      var expectedStatus = 200;
      var data = 'responsedata';

      $responseHandler($error, request, $response, data);
      expect($response.status).toHaveBeenCalledWith(expectedStatus);
      expect($response.send).toHaveBeenCalledWith(data);

      request.method = 'PUT'
      $responseHandler($error, request, $response, data);
      expect($response.status).toHaveBeenCalledWith(expectedStatus);
      expect($response.send).toHaveBeenCalledWith(data);

      request.method = 'DELETE'
      $responseHandler($error, request, $response, data);
      expect($response.status).toHaveBeenCalledWith(expectedStatus);
      expect($response.send).toHaveBeenCalledWith(data);
    });

    it('should respond a 204 status for a GET method response with empty data', function() {
      var request = {
        method: 'GET'
      };
      var expectedStatus = 204;
      var data = null;

      $responseHandler($error, request, $response, data);

      expect($response.status).toHaveBeenCalledWith(expectedStatus);
    });

    it('should respond a 201 status for a POST method response, Location header must provide a URI to the created resource', function() {
      var request = {
        protocol: 'http',
        method: 'POST',
        get: function() {
          return 'localhost';
        },
        originalUrl: '/resource'
      };
      
      var expectedStatus = 201;
      var data = 'THISISARESOURCEID';

      $responseHandler($error, request, $response, data);
      expect($response.status).toHaveBeenCalledWith(expectedStatus);
      expect($response.location).toHaveBeenCalledWith(request.protocol + '://' + request.get() + request.originalUrl+'/'+data);
    });
  });
});
