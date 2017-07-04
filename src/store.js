import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import apiCall from './libs/api_call_lib';
import storage from './libs/storage_lib';
import * as reducers from './reducers';
import { promiseMiddleware } from './middlewares';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

let middlewares = [ thunk.withExtraArgument({ apiCall, storage }), promiseMiddleware ];
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

if (isDebuggingInChrome) {
  const logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
  });
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const reducer = combineReducers(reducers);

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

/**
 * Configure the store.
 * @param {object|undefined} initialState
 */
export function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}