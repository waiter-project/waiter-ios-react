import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, Dimensions, RefreshControl } from 'react-native';

import ContainerComponent from '../../../container_component';
import MapView, { MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps';

import { EventsActions, WaitActions } from '../../../actions';

import {
  Text,
  Tile,
  Card,
  Slider,
  Button,
  FormInput
} from 'react-native-elements';

const EventShowStyle = require('./event_show_style')

class EventShowScreen extends ContainerComponent {
  constructor() {
    super();

    this.state = {
      event: {},
      refreshing: false,
      wait: {},
      numberToBook: 1
    }
  }

  componentWillMount() {
    const { dispatch } = this.props.navigation;
    const { params } = this.props.navigation.state;
    this.eventId = _(params).get('id');
    this.dispatchWithLoader([
      EventsActions.getOneEvent(this.eventId),
      WaitActions.getCurrentWait(this.props.auth.userId)
    ]);
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.dispatchWithLoader([
      EventsActions.getOneEvent(this.eventId),
      WaitActions.getCurrentWait(this.props.auth.userId)
    ])
      .then(() => {
        this.setState({ refreshing: false });
      })
      .catch(() => {
        this.setState({ refreshing: false });
      })
  }

  componentWillReceiveProps(nextProps) {
    this.state.event = nextProps.event.toJS().current;
    this.state.wait = nextProps.wait.toJS().wait;

    console.log(nextProps.wait.toJS())
  }

  _renderWaiter(event, userId) {
    if (!event.listOfWaiters.length && _.isEmpty(wait)) {
      return (
        <Text>Waiter can register</Text>
      )
    } else if (_.isEmpty(wait)) {
      return (
        <Card
          title="You are now subscribed to this event"
        >
          <Text>You'll soon be requested for waiting :)</Text>
          <Button
            title="Unsubscribe"
            backgroundColor='blue'
          />
        </Card>)
    }
    switch (wait.state) {
      case 'created':
        return (
          <Card
            title="You have been requested !"
          >
            <Text>Press this button to let your client know that you begun waiting :)</Text>
            <Button
              title="Start Waiting"
              backgroundColor='blue'
            />
          </Card>)
      case 'queue-start':
        return (
          <Card
            title="Wait in line !"
          >
            <Text>When you're done with you're wait, press this button to let your client know you've done your job</Text>
            <Button
              title="My wait is over"
              backgroundColor='blue'
            />
          </Card>)
      case 'queue-done':
        return (
          <Card
            title="Wait finished !"
          >
            <Text>Alright, great job, now don't forget to enter the code your client gave you in order to get paid \o/</Text>

          </Card>)
      default:
        return (
          <Text>Waiter</Text>
        )
    }
  }

  _requestWait(event) {
    this.dispatchWithLoader(WaitActions.requestWait(
      this.props.auth.userId,
      event._id,
      this.state.numberToBook
    ))
      .then(() => this._onRefresh);
  }

  _renderNotWaiter(event, wait, userId) {
    if (!event.listOfWaiters.length && _.isEmpty(wait)) {
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
    } else if (_.isEmpty(wait)) {
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
            onPress={this._requestWait.bind(this, event)}
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
        if (wait.confirmationCode && wait.confirmationCode !== "") {
          return (
            <Card
              title="The Wait is over !"
            >
              <Text>Congratulation, be sure to give your waiter this code to finalise the transaction :</Text>
              <Text h4>{wait.confirmationCode}</Text>
            </Card>
          )
        } else {
          this.dispatch(WaitActions.generateCode(wait._id, userId));
          return (
            <Card
              title="The Wait is over !"
            >
              <Text>Your code is generating and will be displayed in a bit :</Text>
            </Card>
          )
        }
      default:
        return (
          <Text>Not Waiter</Text>
        )
    }

  }

  render() {
    let event = this.state.event;
    let wait = this.state.wait;

    console.log(wait);
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
            global.isWaiter ? this._renderWaiter(event, wait, this.props.auth.userId) : this._renderNotWaiter(event, wait, this.props.auth.userId)
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
    event: state.event,
    wait: state.wait,
    auth: state.authentication.toJS()
  };
})(EventShowScreen);
