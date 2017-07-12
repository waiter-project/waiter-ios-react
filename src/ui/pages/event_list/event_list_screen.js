import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Text
} from 'react-native-elements';
import { connect } from 'react-redux';
import { EventsActions } from '../../../actions';
import EventMiniatureComponent from './event_miniature';
import ContainerComponent from '../../../container_component';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import eventListStyle from './event_list_style';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class EventListScreen extends ContainerComponent {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  // ----------------------------------------------------------------------

  componentWillMount() {
    const { dispatch } = this.props.navigation;
    dispatch(EventsActions.getAllEvents());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: nextProps.event.toJS().events
    });
  }

  componentDidMount() {
  }

  // ----------------------------------------------------------------------

  _renderEvents(events) {
    return events.map(event => (
      <EventMiniatureComponent
        key={`miniature_${event._id}`}
        event={event}
        navigation={this.props.navigation}
      />
    ))
  }

  render() {
    const events = this.state.events;

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={eventListStyle.containers}>
          {this._renderEvents(events)}
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
    event: state.event
  };
};

export default connect(mapStateToProps)(EventListScreen);
