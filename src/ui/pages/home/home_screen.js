import _ from 'lodash';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const config = require('../../../config');
import { AuthenticationActions } from '../../../actions';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class HomeScreen extends React.Component {

  /**
   * attach event
   */
  componentDidMount() {
    const { navigate } = this.props.navigation;

    this.initializeApp();
  }

  /**
   * Initialize application
   */
  initializeApp() {
    const { dispatch } = this.props.navigation;
    dispatch(AuthenticationActions.init())
      .catch(() => void 0)
      .then(() => {
        setTimeout(function () {
          //SplashScreen.hide();
        }, 300);
      });
  }

  render() {
    return null;
  }
}

export default HomeScreen;