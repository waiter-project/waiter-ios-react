import React, { Component } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import {
  Text
} from 'react-native-elements';
import { connect } from 'react-redux';
import { EventsActions } from '../../../actions';
import MapView, { MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import mapStyle from './map_style';

const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class MapScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      latitude: null,
      longitude: null,
      error: null,
      positionLoaded: false
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          positionLoaded: true
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _handleEventPress(event) {
    const { navigate } = this.props.navigation;
    navigate('EventShowScreen', { id: event._id });
  }

  _generateMarker(events) {
    return events.map(marker => (
      <MapView.Marker
        key={marker._id}
        coordinate={{
          latitude: marker.location[1],
          longitude: marker.location[0]
        }}
        pinColor={randomColor()}
        title={marker.name}
        description={marker.description}
        onCalloutPress={this._handleEventPress.bind(this, marker)}
      />
    ))
  }

  // ----------------------------------------------------------------------



  render() {
    const events = this.state.events;
    console.log(this.state);
    return (
      <View style={mapStyle.container}>
        {this.state.positionLoaded ? <MapView
          style={mapStyle.map}
          mapType={MAP_TYPES.STANDARD}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {
            this._generateMarker(events)
          }
        </MapView> : null}
      </View>
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

export default connect(mapStateToProps)(MapScreen);
