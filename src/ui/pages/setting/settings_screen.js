import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import {
  Text,
  Card,
  List,
  ListItem
} from 'react-native-elements';
import ContainerComponent from '../../../container_component';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
import { AuthenticationActions, LoaderActions } from '../../../actions';


// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class SettingScreen extends ContainerComponent {

  constructor(props) {
    super(props);
    this.state = {
      isWaiter: global.isWaiter
    };
  }

  // ----------------------------------------------------------------------

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
  }

  _logout() {
    const { dispatch } = this.props.navigation;
    dispatch(AuthenticationActions.destroy());
  }

  _securityPressed() {
    const { navigate } = this.props.navigation;
    navigate('SecurityScreen', {});
  }

  _infoPressed() {
    const { navigate } = this.props.navigation;
    navigate('InfoScreen', {});
  }

  _pastWaitsPressed() {
    const { navigate } = this.props.navigation;
    navigate('PastWaitsScreen', {});
  }

  _onSwitch() {
    global.isWaiter = !global.isWaiter;
    this.setState({isWaiter: global.isWaiter});
  }

  render() {
    return (
      <List>
        <ListItem
          title="Security"
          leftIcon={{ name: "lock" }}
          onPress={this._securityPressed.bind(this)}
        />
        <ListItem
          title="Info"
          leftIcon={{ name: "accessibility" }}
          onPress={this._infoPressed.bind(this)}
        />
        <ListItem
          title="Past waits"
          leftIcon={{ name: "av-timer" }}
          onPress={this._pastWaitsPressed.bind(this)}
        />
        <ListItem
          title={`Switch to ${global.isWaiter ? "client" : "waiter"}`}
          leftIcon={{ name: "av-timer" }}
          onPress={this._onSwitch.bind(this)}
        />
        <ListItem
          title="Logout"
          leftIcon={{ name: "exit-to-app" }}
          onPress={this._logout.bind(this)}
        />
      </List>
    );
  } // <= render

  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------


}

export default SettingScreen;
