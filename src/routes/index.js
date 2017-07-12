import { StackNavigator } from 'react-navigation';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


import MainStack from './main_route';

import PlaygroundScreen from '../ui/pages/playground/playground_screen';
import SigninScreen from '../ui/pages/signin/signin_screen';
import HomeScreen from '../ui/pages/home/home_screen';
import MapScreen from '../ui/pages/map/map_screen';
import EventListScreen from '../ui/pages/event_list/event_list_screen';
import EventShowScreen from '../ui/pages/event_show/event_show_screen';
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
  EventListScreen: {
    screen: EventListScreen,
    navigationOptions: {
      title: "EventListScreen"
    }
  },
  EventShowScreen: {
    screen: EventShowScreen,
    navigationOptions: {
      title: "EventShowScreen"
    }
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      title: "MapScreen"
    }
  },
  Home: {
    screen: HomeScreen,
  },
  Signin: {
    screen: SigninScreen,
    navigationOptions: {
      headerVisible: false
    }
  },
  Main: {
    screen: MainStack
  },
};

let RootNavigator = StackNavigator(Root, {
  initialRouteName: "Home",
  headerMode: "screen",
  navigationOptions: {
    headerBackTitle: null,
  }
});

export default RootNavigator;