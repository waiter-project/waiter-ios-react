import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import { configureStore } from './store';
import { AppNavigationState } from './app_navigation_state';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const store = configureStore();

export default function native (platform) {
  class Waiter extends Component {
    render () {
      return (
        <Provider store={store}>
          <AppNavigationState/>
        </Provider>
      );
    }
  }
  AppRegistry.registerComponent('Waiter', () => Waiter);
};
