import { StackNavigator } from 'react-navigation';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


import MainStack from './main_route';

import PlaygroundScreen from '../ui/pages/playground/playground_screen';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

let Root = {
  Playground: {
    screen: PlaygroundScreen,
    navigationOptions: {
      title: "Playground"
    }
  },
  Main: {
    screen: MainStack
  },
};

let RootNavigator = StackNavigator(Root, {
  initialRouteName: "Main",
  headerMode: "screen",
  navigationOptions: {
    headerBackTitle: null,
  }
});

export default RootNavigator;