import { fromJS } from 'immutable';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import loaderHelpers from '../loader_helpers';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const defaultState = fromJS({
  isPageLoading: false,
  message: ""
});

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

/**
 * Set the loader state.
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
function loaderReducer (state = defaultState, action) {
  switch (action.type) {
    case loaderHelpers.pageLoading:
      return _setState(state, action);
    default:
      return state;
  }
}

/**
 * Update the loader state.
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
function _setState(state, action) {
  if (state) {
    let isPageLoading = action.isPageLoading === undefined ? false : action.isPageLoading;
    let message = action.message || "";
    let nextState = state.set('isPageLoading', isPageLoading);
    nextState = nextState.set('message', message);
    return nextState;
  }
  return state;
}

export default loaderReducer;