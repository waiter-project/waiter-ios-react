import { StyleSheet } from 'react-native';

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


let LoaderStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    zIndex: 10
  },
  progressBar: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

export default LoaderStyle;
