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

console.log(width, height)

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
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
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

  _generateMarker(events) {
    console.log("et coucou : ", events);
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
      />
    ))
  }

  // ----------------------------------------------------------------------



  render() {
    const { region } = this.state.region;
    const events = this.state.events;
    return (
      <View style={mapStyle.container}>
        <MapView
          style={mapStyle.map}
          mapType={MAP_TYPES.STANDARD}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {
            this._generateMarker(events)
          }
        </MapView>
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
