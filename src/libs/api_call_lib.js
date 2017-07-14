const config = require('../config');
const StorageLib = require('./storage_lib').default;
const querystring = require('querystring');

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

/**
 * Perform http DESTROY method
 * @param {string} path
 */
function destroy(path) {
  return _request(path, "DELETE");
}

/**
 * Perform http GET method
 * @param {string} path
 */
function get(path) {
  return _request(path, "GET");
}

/**
 * Perform http POST method
 * @param {string} path
 * @param {object} data
 */
function post(path, data) {
  return _request(path, "POST", data);
}

/**
 * Perform http PUT method
 * @param {string} path
 * @param {object} data
 */
function put(path, data) {
  return _request(path, "PUT", data);
}

/**
 * Get http headers for requests.
 * @param {object} data
 * @param {boolean} multipart
 */
function _getHeaders(data, multipart) {

  let headers = {};

  headers['Content-Type'] = 'application/x-www-form-urlencoded';  // à faire gaff pour plus tard Pahl
  //headers['Content-Type'] = 'application/json';
  headers['x-user-type'] = global.isWaiter ? 'waiter' : 'client';

console.log(headers)
  return headers;
}

/**
 * Perform a http request.
 * @param {string} path
 * @param {string} method
 * @param {object} data
 */
function _request(path, method, data) {

  let uri = `${config.api.protocol}://${config.api.host}`;

  if (config.api.port && parseInt(config.api.port)) {
    uri = `${uri}:${config.api.port}`;
  }

  let postData = "";
  if (data) {
    postData = querystring.stringify(data);
  }

  uri = `${uri}${path}?${postData}`;


  let options = {
    method: method,
    headers: _getHeaders(data)
  };

  if (data) {
    options.body = querystring.stringify(data);
  }


  return new Promise((resolve, reject) => {
    _getToken((err, token) => {
      if (!err && token) {
        options.headers['X-Access-Token'] = token;
      }
      _performRequest(uri, options)
        .then((data) => resolve(data))
        .catch((error) => {
          console.log("reject(error)", error);
          reject(error);
        });
    });
  });
}

/**
 * Get the user token
 * @param {function} cb
 */
function _getToken (cb) {
  StorageLib.getItemAsync('token')
  .then((token) => cb(null, token), (error) => cb(error));
}

/**
 * Parse object to json format.
 * @param {object} response
 * @returns {object}
 */
function _parseJSON (response) {
  return response.json();
}

/**
 *  _checkStatus the http response status.
 *  @method  _checkStatus
 *  @param   {object}      response
 *  @return  {object}
 */
function _checkStatus (response) {
  if (!((response.status >= 200 && response.status <= 208) || (response.status === 226))) {
    let error = {};
    error.status = response.status;
    error.statusText = response.statusText;
    error.body = response._bodyText;
    throw error;
  } else {
    return response;
  }
}

/**
 * Perform the http request.
 * @param {string} uri
 * @param {object} options
 * @returns {Promise.<object>}
 */
function _performRequest (uri, options) {
  console.log(uri);
  console.log(options);
  return new Promise ((resolve, reject) => {
    fetch(uri, options)
      .then(_checkStatus)
      .then(_parseJSON)
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export default {
  put,
  post,
  get,
  destroy
};