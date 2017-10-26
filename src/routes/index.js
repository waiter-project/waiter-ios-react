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
import SettingScreen from '../ui/pages/setting/settings_screen';
import SecurityScreen from '../ui/pages/security/security_screen';
import InfoScreen from '../ui/pages/info/info_screen';
import SignupScreen from '../ui/pages/signup/signup_screen';
import PastWaitsScreen from '../ui/pages/past_wait/past_wait_screen';
import RNCreditCard from '../ui/pages/add_card/add_card_screen';

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
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      title: "Setting"
    }
  },
  SecurityScreen: {
    screen: SecurityScreen,
    navigationOptions: {
      title: "Password Change"
    }
  },
  PastWaitsScreen: {
    screen: PastWaitsScreen,
    navigationOptions: {
      title: "My Past Waits"
    }
  },
  InfoScreen: {
    screen: InfoScreen,
    navigationOptions: {
      title: "Info Change"
    }
  },
  RNCreditCard: {
    screen: RNCreditCard,
    navigationOptions: {
      title: "Info Change"
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
    navigationOptions: ({ navigation }) => { navigation }
  },
  Signin: {
    screen: SigninScreen,
    navigationOptions: {
      headerVisible: false
    }
  },
  SignupScreen: {
    screen: SignupScreen,
  },
  Main: {
    screen: MainStack,
  },
};

let RootNavigator = StackNavigator(Root, {
  initialRouteName: "Home",
  headerMode: "screen",
  navigationOptions: ({ navigation }) => {
    return ({
      headerBackTitle: null,
      headerTintColor: "#FFFFFF",
      tabBarColor: {
        backgroundColor: navigation.state.routes ?
          (navigation.state.routes[2] ?
            (navigation.state.routes[2].params ?
              (navigation.state.routes[2].params.isWaiter ? "#1e4561" : "#65a5a7") : "#1e4561") : "#1e4561") : "#1e4561"
      },
      headerStyle: {
        backgroundColor: navigation.state.routes ?
          (navigation.state.routes[2] ?
            (navigation.state.routes[2].params ?
              (navigation.state.routes[2].params.isWaiter ? "#1e4561" : "#65a5a7") : "#1e4561") : "#1e4561") : "#1e4561"
      },
    })
  }

});

export default RootNavigator;