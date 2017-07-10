import { NavigationActions } from 'react-navigation';

/**
 * Go back to previous screen and close current screen.
 * @param {string} routeName
 */
function goBack (routeName) {
  let navParams = {};
  if (routeName) {
    navParams.key = routeName;
  }

  return (dispatch) => {
    dispatch(NavigationActions.back(navParams));
  };
}

/**
 * Replace current state with a new state
 * Wipes the whole navigation state and replaces it with the result of several actions
 * @param {string} routeName
 */
function reset(routeName) {
  return (dispatch) => {
    dispatch(NavigationActions.reset({
      index: 0,
      key: 'Init',
      actions: [
        NavigationActions.navigate({ routeName })
      ]
    }));
  };
}

/**
 * Navigate to another route.
 * Update the current state with the result of a Navigate action.
 * @param {string} routeName
 * @param {object?} params
 */
function gotTo(routeName, params) {
  let navParams = _setNavigationParams(routeName, params);

  return (dispatch) => {
    dispatch(NavigationActions.navigate(navParams));
  };
}

/**
 * Set the navigation router parameters.
 * @param {string} routeName
 * @param {object?} routeParams
 * @returns {object}
 */
function _setNavigationParams(routeName, routeParams) {
  let data = {
    routeName
  };
  if (routeParams) {
    data.params = routeParams;
  }
  return data;
}

export default {
  gotTo,
  goBack,
  reset
};
