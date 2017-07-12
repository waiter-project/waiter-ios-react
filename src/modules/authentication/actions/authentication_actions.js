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
  return function (dispatch) {
    return AuthenticationLib.authenticateUserAsync({
      email: params.credentials.username,
      password: params.credentials.password,
      deviceId: "device_id_here"
    }
    )
      .then((data) => {
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
      .catch(() => void 0)
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
    return AuthenticationLib.getUserTokenAsync()
      .then((tokenFetched) => {
        token = tokenFetched;
        return AuthenticationLib.getUserIdAsync()
      })
      .then((userIdFetched) => {
        const data = {
          token: token,
          userId: userIdFetched
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
  initializeWithToken
};
