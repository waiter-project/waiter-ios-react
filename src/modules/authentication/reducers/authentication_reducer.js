import { fromJS } from 'immutable';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import authHelpers from '../authentication_helpers';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const DEFAULT_STATE = fromJS({
  loginFailed: false,
  isLoggedIn: false,
  token: null,
  userId: null
});

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

function authenticationReducer (state = DEFAULT_STATE, action) {
  switch (action.type) {

    case authHelpers.initSuccess:
      return _setAuthSuccess(state, action.data);
    case authHelpers.createSuccess:
      return _setAuthSuccess(state, action.data);

    case authHelpers.destroyFailure:
    case authHelpers.destroySuccess:
    case authHelpers.initFailure:
    case authHelpers.reset:
      return _resetState(state, action.data);

    case authHelpers.createFailure:
      return _failureToken(state, action.data);

    default:
      return state;
  }
} // <= authenticationReducer

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

function _setAuthSuccess (state, data) {
  if (!data || !data.token) {
    return state;
  }
  return fromJS({ loginFailed: false, isLoggedIn: true, token: data.token, userId: data.userId });
}

function _resetState () {
  return fromJS({ loginFailed: false, isLoggedIn: false, token: null, userId: null });
}

function _failureToken () {
  return fromJS({ loginFailed: true, isLoggedIn: false, token: null, userId: null });
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export default authenticationReducer;
