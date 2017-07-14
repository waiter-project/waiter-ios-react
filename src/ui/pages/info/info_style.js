import { StyleSheet, Platform } from 'react-native';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import { ColorHelper } from '../../../helpers';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export default StyleSheet.create({
  container: {
    backgroundColor: ColorHelper.blue001,
  },
  hero: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  labelStyle: {
    color: ColorHelper.textNormal,
    fontSize: 16,
    fontWeight: "normal"
  },
  labelContainerStyle: {
    marginTop: 8
  },
  inputStyle: {
    color: ColorHelper.textNormal,
    padding: 5
  },
  globalContainer: {
    height: Platform.height,
    backgroundColor: ColorHelper.blue001,
    flex: 1,
    padding: 10
  },
  containerStyle: {
    padding: 10
  },
  connectContainer: {
    padding: 20,
    marginTop: 18,
    flex: 1,
    alignItems: 'center'
  },
  connectButton: {
    width: 200,
    height: 36,
    borderRadius: 100,
    backgroundColor: ColorHelper.blue001,
    borderColor: ColorHelper.textNormal,
    borderWidth: 1
  },
  fbButtonContainer: {
    padding: 20
  },
});
