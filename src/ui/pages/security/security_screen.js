import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserActions } from '../../../actions';
import {
  Button,
  FormInput,
  Text,
  FormLabel
} from 'react-native-elements';

import ContainerComponent from '../../../container_component';
import securityStyle from './security_style';

import { ScrollView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ColorHelper } from '../../../helpers';

class SecurityScreen extends ContainerComponent {
  constructor() {
    super();

    this.newPassword = "";
    this.password = "";
    this.state = {
      passFocus: false,
      newPassFocus: false
    };
  }

  _handleSubmit() {
    this.dispatchWithLoader(UserActions.updatePassword({
      password: this.password,
      newPassword: this.newPassword,
      userId: this.props.user._id
    }))
  }

  render() {
    return (
      <View style={securityStyle.globalContainer}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" style={securityStyle.container}>
          <KeyboardAwareScrollView behavior="position" >
            <Text style={securityStyle.connectContainer}>
              Here you can change your password :
            </Text>
            <FormLabel>Old Password</FormLabel>
            <FormInput
              hintText="Current Password"
              placeholder={this.state.passFocus ? " " : "oldPassword"}
              secureTextEntry={true}
              onChangeText={this.linkValue("password")}
              onFocus={() => { this.setState({ passFocus: true }); }}
              onEndEditing={() => { this.setState({ passFocus: false }); }}
            />
            <FormLabel>New Password</FormLabel>
            <FormInput
              hintText="New Password"
              floatingLabelText="New Password"
              placeholder={this.state.newPassFocus ? " " : "newPassord"}
              secureTextEntry={true}
              onChangeText={this.linkValue("newPassword")}
              onFocus={() => { this.setState({ newPassFocus: true }); }}
              onEndEditing={() => { this.setState({ newPassFocus: false }); }}
            />
            <View style={securityStyle.connectContainer}>
              <Button
                onPress={this._handleSubmit.bind(this)}
                buttonStyle={securityStyle.connectButton}
                raised={true}
                color={ColorHelper.textNormal}
                title={"Change Password"} />
            </View>
          </KeyboardAwareScrollView>
        </ScrollView >
      </View >
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.toJS().user
  };
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export default connect(mapStateToProps)(SecurityScreen);