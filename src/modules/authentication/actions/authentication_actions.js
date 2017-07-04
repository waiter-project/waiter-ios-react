import PushNotificationLib from '../../../libs/push_notification_lib';
import AuthenticationLib from '../../../libs/auth_lib';
import authHelpers from '../authentication_helpers';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


import NavActions from '../../../actions/navigation_actions';

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
        registerUserDevice();
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
function create (params) {
  return function (dispatch) {
    return AuthenticationLib.authenticateUserAsync(params)
      .then((token) => {
        dispatch({ type: authHelpers.createSuccess, data: { token } });
        registerUserDevice();
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
function destroy () {
  return function (dispatch) {
    return AuthenticationLib.destroySessionAsync()
      .catch(() => void 0)
      .then(() => {
        removeUserDevice();
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
function init () {
  return function (dispatch) {
    return AuthenticationLib.getUserTokenAsync()
      .then((token) => {
        dispatch({ type: authHelpers.initSuccess, data: { token } });
        registerUserDevice();
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
function reset () {
  return {
    type: authHelpers.reset
  };
}

/**
 * Register user device
 */
function registerUserDevice () {
  return PushNotificationLib.getPushInfosAsync()
    .then(PushNotificationLib.registerDeviceAsync);
}

/**
 * Remove user device from storage
 */
function removeUserDevice() {
  return PushNotificationLib.removePushInfosAsync();
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default {
  create,
  destroy,
  init,
  reset,
  initializeWithToken
};
