(function() {
  var url = require('url');

  function isAJavascriptObject(object) {
    return typeof object === 'object';
  }

  function validateErrorArgument(error) {
    if (!isAJavascriptObject(error)) {
      throw new Error('An error object must be provided.');
    }

    if ((error) && (typeof error.message !== 'string')) {
      throw new Error('Error object should be null or must have a String message.');
    }
  };

  function validateRequestArgument(request) {
    if (!isAJavascriptObject(request)) {
      throw new Error('A request object must be provided.');
    }    
  };

  function validateResponseArgument(response) {
    if (!isAJavascriptObject(response)) {
      throw new Error('A response object must be provided.');
    }    
  };

  function validateArguments(error, request, response, data) {
    validateErrorArgument(error);
    validateRequestArgument(request);
    validateResponseArgument(response);    
  };

  function handleError(error, response) {
    response.status(error.status || 500);
    response.send(error.message);
    response.end();
  };

  function responseBuilderForGetOrDeleteMethod(request, response, data) {
    if (data) {
      return response.status(200).send(data);
    }

    return response.status(204);
  };

  function responseBuilderForPostMethod(request, response, data) {
    var uri = url.format({
      protocol: request.protocol,
      host: request.get('host'),
      pathname: request.originalUrl + '/' + data._id
    });

    response.status(201).location(uri).send(data);
  };

  function responseBuilderForPutMethod(request, response, data) {
    return response.status(200);
  };

  function getResponseBuilderByMethod(method) {
    var builders = {
      'GET': responseBuilderForGetOrDeleteMethod,
      'POST': responseBuilderForPostMethod,
      'PUT': responseBuilderForPutMethod,
      'DELETE': responseBuilderForGetOrDeleteMethod
    };

    return builders[method];
  };

  function handleSuccess(request, response, data) {
    var buildResponse = getResponseBuilderByMethod(request.method);

    buildResponse(request, response, data);

    response.end();
  };

  function handleResponse(error, request, response, data) {
    validateArguments(error, request, response, data);

    if (error) {
      return handleError(error, response);
    }

    return handleSuccess(request, response, data);
  };

  module.exports = handleResponse;

})();
