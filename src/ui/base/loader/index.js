import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

import LoaderStyle from './loader_style';

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

class Loader extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const customStyles = StyleSheet.create({
      overlay: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        backgroundColor: this.props.overlayColor,
        width: 120,
        height: 100
      },
      text: {
        color: this.props.textColor,
        fontSize: this.props.textFontSize,
        marginTop: 8
      }
    });

    if (!this.props.isLoading) {
      return (<View/>);
    }

    let textCmp = (this.props.text) ? (<Text numberOfLines={1} style={customStyles.text}> {this.props.text}</Text>) : null;

    return (
      <View style={LoaderStyle.container}>
        <View style={customStyles.overlay}>
          <ActivityIndicator
            color={this.props.color || "rgb(242, 126, 57)"}
            size="large"
            style={LoaderStyle.progressBar}
            />
            {textCmp}
        </View>
      </View>
    );
  }
}

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

export default Loader;
