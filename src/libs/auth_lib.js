import ApiCallLib from './api_call_lib';
import StorageLib from './storage_lib';

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

/**
 * Authenticate User.
 * @param {object} params
 * @returns {Promise}
 */
function authenticateUserAsync (params) {
  let token;
  return ApiCallLib.post('/login', { authentication: params })
    .then((data) => token = data.token)
    .then(storeUserTokenAsync)
    .then(() => token);
}

/**
 * Destroy user token
 */
function destroyTokenAsync() {
  return StorageLib.removeItemAsync("token");
}

/**
 * Get user token
 */
function getUserTokenAsync() {
  return StorageLib.getItemAsync("token")
    .then((token) => token
      ? Promise.resolve(token)
      : Promise.reject(new Error("User token not found"))
    );
}

/**
 * Store user token
 * @param {string} value
 */
function storeUserTokenAsync(value) {
  if (!value) {
    return Promise.reject(new Error("token can not be null"));
  }
  return StorageLib.setItemAsync("token", value);
}

/**
 * Destroy user session.
 */
function destroySessionAsync() {
  return ApiCallLib.destroy('/logout')
    .catch(() => void 0)
    .then(() => destroyTokenAsync());
}

export default {
  authenticateUserAsync,
  destroySessionAsync,
  destroyTokenAsync,
  getUserTokenAsync,
  storeUserTokenAsync,
};