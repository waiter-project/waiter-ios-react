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
function authenticateUserAsync(params) {
  let token;
  let userId;
  return ApiCallLib.post('/user/login', params)
    .then((data) => {
      userId = data.data.user._id
      token = data.data.token
      return token
    })
    .then(storeUserTokenAsync)
    .then(() => {
      return storeUserIdAsync(userId)
    })
    .then(() => {
  return {
    token: token,
    userId: userId
  }
});
}

/**
 * Destroy user token
 */
function destroyTokenAsync() {
  return StorageLib.removeItemAsync("token")
    .then(StorageLib.removeItemAsync("userId"));
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
 * Get user id
 */
function getUserIdAsync() {
  return StorageLib.getItemAsync("userId")
    .then((userId) => userId
      ? Promise.resolve(userId)
      : Promise.reject(new Error("User userId not found"))
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
 * Store user id
 * @param {string} value
 */
function storeUserIdAsync(value) {
  if (!value) {
    return Promise.reject(new Error("userId can not be null"));
  }
  return StorageLib.setItemAsync("userId", value);
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
  storeUserIdAsync,
  getUserIdAsync
};