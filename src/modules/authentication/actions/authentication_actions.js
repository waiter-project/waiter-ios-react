import AuthenticationLib from '../../../libs/auth_lib';
import authHelpers from '../authentication_helpers';
import StorageLib from '../../../libs/storage_lib';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


import NavActions from '../../../actions/navigation_actions';
import { UserActions } from '../../../actions/index';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

/**
 * Store token to the storage
 * @param {string} token
 */
function initializeWithToken(token) {
  return function (dispatch) {
    return AuthenticationLib.storeUserTokenAsync(token)
      .then(() => {
        return dispatch({ type: authHelpers.initSuccess, data: { token } });
      })
      .catch((error) => dispatch({ type: authHelpers.reset, error }));
  };
}

/**
 *
 * Create authentication token
 * @param {Object} params
 * @returns {function}
 */
function create(params) {
  let data;
  return function (dispatch) {
    return StorageLib.getItemAsync("deviceId")
    .then((deviceId) => AuthenticationLib.authenticateUserAsync({
      email: params.credentials.username,
      password: params.credentials.password,
      deviceId: deviceId
    }
    ))
      .then((dataFetched) => {
        data = dataFetched;
        return dispatch(UserActions.getUser(data.userId))
      })
      .then(() => {
        dispatch({ type: authHelpers.createSuccess, data: data });
        return dispatch(NavActions.reset('Main'));
      })
      .catch((error) => dispatch({ type: authHelpers.createFailure, error }));
  };
}

/**
 *
 * Create authentication token
 * @param {Object} params
 * @returns {function}
 */
function signup(params) {
  let data;
  return function (dispatch) {
    return StorageLib.getItemAsync("deviceId")
    .then((deviceId) => AuthenticationLib.signupUserAsync({
      email: params.credentials.username,
      password: params.credentials.password,
      deviceId: deviceId,
      firstName: params.credentials.firstName,
      lastName: params.credentials.lastName,
      type: 0
    }
    ))
      .then((dataFetched) => {
        data = dataFetched;
        return dispatch(UserActions.getUser(data.userId))
      })
      .then(() => {
        dispatch({ type: authHelpers.createSuccess, data: data });
        return dispatch(NavActions.reset('Main'));
      })
      .catch((error) => dispatch({ type: authHelpers.createFailure, error }));
  };
}

/**
 *
 * Destroy user session
 * @returns {function}
 */
function destroy() {
  return function (dispatch) {
    return AuthenticationLib.destroySessionAsync()
      .catch(() => console.log("error while logging out"))
      .then(() => {
        dispatch({ type: authHelpers.destroySuccess });
        return dispatch(NavActions.reset('Home'));
      });
  };
}

/**
 *
 * Initialize user sessions
 * @returns {function}
 */
function init() {
  return function (dispatch) {
    let token;
    let userId;
    return AuthenticationLib.getUserTokenAsync()
      .then((tokenFetched) => {
        token = tokenFetched;
        return AuthenticationLib.getUserIdAsync()
      })
      .then((userIdFetched) => {
        userId = userIdFetched;
        return dispatch(UserActions.getUser(userIdFetched))
      })
      .then((userIdFetched) => {
        const data = {
          token: token,
          userId: userId
        }
        dispatch({ type: authHelpers.initSuccess, data: data });
        return dispatch(NavActions.reset("Main"));
      })
      .catch((error) => {
        dispatch({ type: authHelpers.reset, error });
        return dispatch(NavActions.reset('Signin'));
      });
  };
}

/**
 *
 * Reset authentication state
 * @returns {function}
 */
function reset() {
  return {
    type: authHelpers.reset
  };
}

/**
 * Register user device
 */
function registerUserDevice() {
}

/**
 * Remove user device from storage
 */
function removeUserDevice() {
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default {
  create,
  destroy,
  init,
  reset,
  initializeWithToken,
  signup
};
