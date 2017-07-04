import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import PlaygroundScreen from '../ui/pages/playground/playground_screen';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const iconSize = 35;

const tabBarOptions = {
  showIcon: true,
  style: {
    backgroundColor: "#FFFFFF"
  }
};

const MainStack = TabNavigator({
  Waiter: {
    screen: PlaygroundScreen,
    navigationOptions: {
      headerTintColor: "#FF0000",
      title: "Waiter",
      tabBarLabel: "Waiter",
      tabBarIcon: ({ tintColor }) => <Icon name="flight" size={iconSize} color={tintColor} />,
    }
  },
  Waiting: {
    screen: PlaygroundScreen,
    navigationOptions: {
      headerTintColor: "#0000FF",
      title: "Waiting",
      tabBarLabel: "Waiting",
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={iconSize} color={tintColor} />,
    }
  }
}, {
  tabBarOptions: tabBarOptions,
  initialRouteName: "Waiter"
});

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


export default MainStack;
