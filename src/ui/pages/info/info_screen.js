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
import infoStyle from './info_style';

import { ScrollView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ColorHelper } from '../../../helpers';

class InfoScreen extends ContainerComponent {
  constructor() {
    super();

    this.email = "";
    this.firstName = "";
    this.lastName = "";
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };
  }

  componentWillMount() {
    if (this.props.user) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email
      });
      this.firstName = this.props.user.firstName
      this.lastName = this.props.user.lastName
      this.email = this.props.user.email
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.user.firstName,
      lastName: nextProps.user.lastName,
      email: nextProps.user.email
    });
    this.firstName = nextProps.user.firstName
    this.lastName = nextProps.user.lastName
    this.email = nextProps.user.email
  }

  _handleSubmit() {
    this.dispatchWithLoader(UserActions.updateUser({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userId: this.props.user._id
    }))
  }

  render() {
    console.log(this.state);
    console.log(this.email)
    return (
      <View style={infoStyle.globalContainer}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" style={infoStyle.container}>
          <KeyboardAwareScrollView behavior="position" >
            <Text style={infoStyle.connectContainer}>
              Here you can change your infos :
            </Text>
            <FormLabel>Email</FormLabel>
            <FormInput
              hintText="Email"
              onChangeText={this.linkValue("email")}
              defaultValue={this.state.email}
            />
            <FormLabel>First name</FormLabel>
            <FormInput
              hintText="First Name"
              onChangeText={this.linkValue("firstName")}
              defaultValue={this.state.firstName}
            />
            <FormLabel>Last name</FormLabel>
            <FormInput
              hintText="Last Name"
              onChangeText={this.linkValue("lastName")}
              defaultValue={this.state.lastName}
            />
            <View style={infoStyle.connectContainer}>
              <Button
                onPress={this._handleSubmit.bind(this)}
                buttonStyle={infoStyle.connectButton}
                raised={true}
                color={ColorHelper.textNormal}
                title={"Update Info"} />
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

export default connect(mapStateToProps)(InfoScreen);