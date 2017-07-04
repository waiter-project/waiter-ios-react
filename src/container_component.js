import _ from 'lodash';
import React, { Component } from 'react';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import { alert } from './helpers';
import { LoaderActions } from './actions';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export default class ContainerComponent extends Component {

  constructor (props) {
    super(props);
  }

  /**
   * Dispatch one or more actions, and display a loader
   *
   * @param {Object | Object[]} action - the action to dispatch
   * @param {String?} errorMessage - the error message to display if an error occured
   * @param {String?} successMessage - the succes message to display
   * @returns {Promise}
   */
  dispatchWithLoader (action, errorMessage, successMessage) {
    return this._dispatch(true, action, errorMessage, successMessage);
  }

  /**
   * Dispatch one or more actions
   *
   * @param {Object | Object[]} action - the action to dispatch
   * @param {String?} errorMessage - the error message to display if an error occured
   * @param {String?} successMessage - the succes message to display
   * @returns {Promise}
   */
  dispatch (action, errorMessage, successMessage) {
    return this._dispatch(false, action, errorMessage, successMessage);
  }

  /**
   * Dispatch one or more actions
   *
   * @param {Boolean} loaderEnabled - if set to true display a loader
   * @param {Object | Object[]} action - the action to dispatch
   * @param {String?} errorMessage - the error message to display if an error occured
   * @param {String?} successMessage - the succes message to display
   * @returns {Promise}
   */
  _dispatch (loaderEnabled, action, errorMessage, successMessage) {
    if (!action) {
      throw new Error("Can not dispatch undefined action");
    }

    if (loaderEnabled) {
      this.props.dispatch(LoaderActions.loader(true));
    }

    let promises = this._getPromise(action)
    .then(() => {
      if (loaderEnabled) {
        this.props.dispatch(LoaderActions.loader(false));
      }
      if (successMessage) {
        alert(
          "",
          successMessage
        );
      }
    })
    .catch((error) => {
      if (loaderEnabled) {
        this.props.dispatch(LoaderActions.loader(false));
      }
      if (errorMessage) {
        alert(
          "",
          errorMessage
        );
      }

      throw error;
    });
    this._dispatchAction(action);
    return promises;
  }

  /**
   * Promisify actions
   *
   * @param {Object | Object[]} action - the actions to promisify
   * @returns {Promise}
   */
  _getPromise (action) {
    if (Array.isArray(action)) {
      let promises = [];
      action.forEach((currentAction) => {
        if (currentAction.promise) {
          promises.push(currentAction.promise);
        }
      });

      return Promise.all(promises);
    }

    return action.promise || Promise.resolve();
  }

  /**
   * Dispatch actions
   *
   * @param {Object | Object[]} action - the actions to dispatch
   */
  _dispatchAction (action) {
    if (Array.isArray(action)) {
      action.forEach((currentAction) => {
        this.props.dispatch(currentAction);
      });
      return;
    }

    this.props.dispatch(action);
  }

  /**
   * Link the input value to the property path
   * @param {string} propertyPath - the property path to set with the new input value
   * @param {function?} callback - callback function called with the new input value
   */
  linkValue(propertyPath, callback) {
    let context = this;
    return function (newValue) {
      _.set(context, propertyPath, newValue);
      if (typeof callback === "function") {
        return callback(newValue);
      }
    };
  }

};