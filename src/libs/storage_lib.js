import { AsyncStorage } from 'react-native';

function getItemAsync(item) {
  return AsyncStorage.getItem(item);
}

function removeItemAsync(item) {
  return AsyncStorage.removeItem(item);
}

function setItemAsync(item, data) {
  return AsyncStorage.setItem(item, data);
}

function getObjectAsync(key) {
  return AsyncStorage.getItem(key)
    .then((data) => (data) ? JSON.parse(data) : null);
}

function setObjectAsync(key, data) {
  return AsyncStorage.setItem(key, JSON.stringify(data));
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export default {
  getItemAsync,
  getObjectAsync,
  removeItemAsync,
  setItemAsync,
  setObjectAsync,
};