import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Image } from 'react-native';
import {
  Button,
  FormInput,
} from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import { AuthenticationActions, LoaderActions } from '../../../actions';
import { alert } from '../../../helpers';
import signinStyle from './signin_style';
import ContainerComponent from '../../../container_component';
import Loading from '../loader';

import { ColorHelper } from '../../../helpers';

const logo = require('../../assets/images/LogoAchanger.png');

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class SigninScreen extends ContainerComponent {

  constructor(props) {
    super(props);
    this.formData = {};
    this.state = {
      emailFocus: false,
      passFocus: false
    };
  }

  /**
   * handle classic signin.
   */
  handleClassicSigninPress() {
    this._isClassicSignIn = true;
    this.identifyUser(this.formData);
  }

  /**
   * Authentify user on remote server and provide access token.
   * @param {object} params
   */
  identifyUser(params) {
    this.dispatch([
      LoaderActions.loader(true),
      AuthenticationActions.reset(),
      AuthenticationActions.create(params),
    ]);
  }

  componentWillReceiveProps(nextProps) {
    let auth = nextProps.authentication.toJS();
    this.dispatch(LoaderActions.loader(false));
    if (auth.loginFailed) {
      alert(
        "Error",
        "An error occured when logging you in"
      );
    }
  }

  render() {
    return (
      <View style={signinStyle.globalContainer}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" style={signinStyle.container}>
          <KeyboardAwareScrollView behavior="position" >
            <View style={signinStyle.hero}>
              <Image source={logo} style={signinStyle.logo} />
            </View>
            <View style={signinStyle.containerStyle}>
              <FormInput
                ref="emailInput"
                textInputRef="email"
                placeholder={this.state.emailFocus ? " " : "Email"}
                placeholderTextColor={ColorHelper.textNormal}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={this.linkValue("formData.credentials.username")}
                onFocus={() => { this.setState({ emailFocus: true }); }}
                onEndEditing={() => { this.setState({ emailFocus: false }); }}
                inputStyle={signinStyle.inputStyle}
                containerStyle={signinStyle.containerStyler}
              />
            </View>
            <View style={signinStyle.containerStyle}>
              <FormInput
                ref="passwordInput"
                placeholder={this.state.passFocus ? " " : "Password"}
                onFocus={() => { this.setState({ passFocus: true }); }}
                onEndEditing={() => { this.setState({ passFocus: false }); }}
                placeholderTextColor={ColorHelper.textNormal}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={this.linkValue("formData.credentials.password")}
                inputStyle={signinStyle.inputStyle}
              />
            </View>
            <View style={signinStyle.connectContainer}>
              <Button
                onPress={this.handleClassicSigninPress.bind(this)}
                buttonStyle={signinStyle.connectButton}
                raised={true}
                color={ColorHelper.textNormal}
                title={"Sign In"} />
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
        <Loading />
      </View>
    );
  }
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export default connect(mapStateToProps)(SigninScreen);