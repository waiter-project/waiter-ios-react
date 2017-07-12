import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import {
  Text,
  Card
} from 'react-native-elements';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class EventMiniatureComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // ----------------------------------------------------------------------

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
  }

  // ----------------------------------------------------------------------

  _handleEventPress(event) {
    const { navigate } = this.props.navigation;
    navigate('EventShowScreen', { id: event._id });
  }

  render() {
    const event = this.props.event;

    return (
      <TouchableOpacity
        onPress={this._handleEventPress.bind(this, event)}
      >
        <Card
          title={event.name}
          image={{ uri: "https://www.theclementimall.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png" }}
        >
          <Text>
            {event.description}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  } // <= render

  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------


}

export default EventMiniatureComponent;
