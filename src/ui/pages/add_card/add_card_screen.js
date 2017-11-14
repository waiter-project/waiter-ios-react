import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../../../actions';

import ContainerComponent from '../../../container_component';
import {
  Card
} from 'react-native-elements';
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
import {
  AppRegistry,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Image
} from 'react-native';

import {
  Button
} from 'react-native-elements';

import stripe from 'tipsi-stripe';

stripe.init({
  publishableKey: "pk_test_hSipBuKxXUGrnuu2XpqrNpm4"
});

class AddCardScreen extends ContainerComponent {

  constructor(props) {
    super(props);
    this.state = {
      cardsList: []
    };
  }

  // ----------------------------------------------------------------------

  componentWillMount() {
    this.dispatch(UserActions.getCards(this.props.user_data.user._id));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cardsList: nextProps.user_data.savedCards
    });
  }

  _addNewInfo() {
    const options = {
      smsAutofillDisabled: true
    };
    stripe.paymentRequestWithCardForm(options)
      .then(response => {
        this.dispatch(UserActions.saveCard(this.props.user_data.user._id, response.card.last4))
      })
      .catch(error => {
        // Handle error
      });
  }

  _removeCard(index) {
    // Remove card from DB
  }

  _renderCards(cardsList) {
    return cardsList.map((card, i) => {
      return (
        <Card
          key={`${card}_${i}`}
          title={"Card ending in " + card}
        >
          <Button
            title="Remove card"
            backgroundColor='grey'
            onPress={this._removeCard.bind(this, i)}
            style={{
              padding: 1
            }}
          />
        </Card>
      )
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={{
          padding: 5
        }}>
          {this._renderCards(this.state.cardsList)}
          <View style={{
            padding: 10
          }}>
            <Button
              title="Add new info"
              backgroundColor='blue'
              onPress={this._addNewInfo.bind(this)}
            />
          </View>
        </View>
      </ScrollView>
    );
  } // <= render

  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------


}

function mapStateToProps(state) {
  return {
    user_data: state.user.toJS()
  };
};

export default connect(mapStateToProps)(AddCardScreen);