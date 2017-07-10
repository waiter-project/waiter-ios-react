import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Text
} from 'react-native-elements';
import { connect } from 'react-redux';
import { EventsActions } from '../../../actions';
//import MapView from 'react-native-maps';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import mapStyle from './map_style';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class MapScreen extends Component {

  constructor (props) {
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
          events: nextProps.event.toJS()
      });
  }

  componentDidMount () {
  }

  // ----------------------------------------------------------------------

  render() {
    console.log(this.state);
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={mapStyle.containers}>
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

export default connect(mapStateToProps)(MapScreen);
