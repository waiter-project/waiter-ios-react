import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { UserActions } from '../../../actions';
import ContainerComponent from '../../../container_component';
import {
  Text,
  Card
} from 'react-native-elements';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import pastWaitsStyle from './past_wait_style';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class PastWaitsScreen extends ContainerComponent {

  constructor(props) {
    super(props);
    this.state = {
      pastWaits: []
    };
  }

  // ----------------------------------------------------------------------

  componentWillMount() {
    const { dispatch } = this.props.navigation;
    console.log(this.state.user);
    dispatch(UserActions.getPastWaits(this.props.user.toJS().user._id));
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.user.toJS())
    this.setState({
      pastWaits: nextProps.user.toJS().pastWaits
    });
  }

  componentDidMount() {
  }

  // ----------------------------------------------------------------------

  _renderWaits(waits) {
    return waits.map(wait => (
      <Card
        key={`wait_${wait._id}`}
        title={wait.eventName}
      >
        <Text>
          {wait.queueEnd}
        </Text>
        <Text>
          {wait.state}
        </Text>
      </Card>
    ))
  }

  render() {
    const waits = this.state.pastWaits;

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={pastWaitsStyle.container}>
          {this._renderWaits(waits)}
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
    user: state.user
  };
};

export default connect(mapStateToProps)(PastWaitsScreen);
