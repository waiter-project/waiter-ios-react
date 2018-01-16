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
      OneSignal.addEventListener('received', () => {console.log("received")});
      OneSignal.addEventListener('opened', () => {console.log("opened")});
      OneSignal.addEventListener('registered', () => {console.log("registered")});
      OneSignal.addEventListener('ids', (device) => {
        console.log("ids : ", device)
        StorageLib.setItemAsync("deviceId", device.userId);
      });
    }

    onReceived(notification) {
      console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
      console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
      console.log('Device info: ', device);
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
