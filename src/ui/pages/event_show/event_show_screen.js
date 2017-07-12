import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, Dimensions, RefreshControl } from 'react-native';

import ContainerComponent from '../../../container_component';
import MapView, { MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps';

import { EventsActions } from '../../../actions';

import {
  Text,
  Tile,
  Card,
  Slider,
  Button
} from 'react-native-elements';

const EventShowStyle = require('./event_show_style')

class EventShowScreen extends ContainerComponent {
  constructor() {
    super();

    this.state = {
      event: {},
      refreshing: false,
      wait: {
        _id: "594dc5af1c11408a4d1b0930",
        state: "queue-done",
        clientId: "594dbe9b21f0b57d7bdb9803",
        eventId: "594dc37e21f0b57d7bdb9805",
        eventName: "Lombard Street",
        createdAt: "2017-06-24T01:51:43.248Z",
        nresponses: [],
        waitersIds: [
          "594dbeba21f0b57d7bdb9804"
        ]
      },
      numberToBook: 1
    }
  }

  componentWillMount() {
    const { dispatch } = this.props.navigation;
    const { params } = this.props.navigation.state;
    this.eventId = _(params).get('id');
    dispatch(EventsActions.getOneEvent(this.eventId));
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.dispatch(EventsActions.getOneEvent(this.eventId))
      .then(() => {
        this.setState({ refreshing: false });
      });
  }

  componentWillReceiveProps(nextProps) {
    this.state.event = nextProps.event.toJS().current;
  }

  _renderWaiter(event) {
    return (
      <Text>Waiter</Text>
    )
  }

  _renderNotWaiter(event, wait) {
    if (!event.listOfWaiters.length) {
      return (
        <Card
          title="No Waiter found"
        >
          <Text>
            Sadly, no waiter was found for this event :/
          </Text>
          <Text>
            Swipe down no reload or come back later !
          </Text>
        </Card>
      )
    } else if (!wait) {
      return (
        <Card
          title="Request a Wait"
        >
          <Text>Waiter to Request : {this.state.numberToBook}</Text>
          <Slider
            minimumValue={1}
            maximumValue={event.listOfWaiters.length}
            value={1}
            onValueChange={(value) => this.setState({ numberToBook: value })}
            step={1}
          />
          <Button
            title="Request Wait"
            backgroundColor='blue'
          />
        </Card>)
    }
    switch (wait.state) {
      case 'created':
        return (
          <Card
            title="Wait Requested"
          >
            <Button
              title="Your wait will begin soon"
              backgroundColor='blue'
              disabled
            />
          </Card>)
      case 'queue-start':
        return (
          <Card
            title="Wait in progress"
          >
            <Button
              title="Your wait is being taken care of"
              backgroundColor='blue'
              disabled
            />
          </Card>)
      case 'queue-done':
        return (
          <Card
            title="The Wait is over !"
          >
            <Text>Congratulation, be sure to give your waiter this code to finalise the transaction :</Text>
            <Text h4>ADG456H</Text>
          </Card>)
      default:
        return (
          <Text>Not Waiter</Text>
        )
    }

  }

  render() {
    let event = this.state.event;
    let wait = this.state.wait;

    if (event.location) {
      return (

        <ScrollView style={EventShowStyle.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}>
          <Tile
            title={event.name}
            imageSrc={{ uri: "https://www.theclementimall.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png" }}
            featured
          >
          </Tile>
          <Text
            style={EventShowStyle.textHeanding}
            h4>
            {event.description}
          </Text>
          <Text>
            {event.address}
          </Text>
          {
            global.isWaiter ? this._renderWaiter(event, wait) : this._renderNotWaiter(event, wait)
          }
          {/*<MapView
            style={EventShowStyle.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />*/}
        </ScrollView>
      );
    } else {
      return (<View />)
    }
  }
}

export default connect((state) => {
  return {
    event: state.event
  };
})(EventShowScreen);
