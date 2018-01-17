import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import StorageLib from './libs/storage_lib';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import { configureStore } from './store';
import { AppNavigationState } from './app_navigation_state';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const store = configureStore();

global.isWaiter = 1;

//navigator.geolocation.requestAuthorization();

export default function native(platform) {
  class Waiter extends Component {
    componentWillMount() {
      OneSignal.addEventListener('ids', (device) => {
        console.log("ids : ", device)
        StorageLib.setItemAsync("deviceId", device.userId);
      });
    }

    render() {
      return (
        <Provider store={store}>
          <AppNavigationState />
        </Provider>
      );
    }
  }
  AppRegistry.registerComponent('Waiter', () => Waiter);
};
