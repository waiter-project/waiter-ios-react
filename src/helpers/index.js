
import ActionHelper from './action_helper';
import ColorHelper from './color_helper';
import { Alert } from 'react-native';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

/***
 * transforme un objet en chaine de carractère sous la forme d'une query string
 * les propriétés avec des valeurs null/undefined/"" ne sont pas ajoutées
 * @param {object} obj - l'objet à transformer
 * @returns {string} - la query string
 * @private
 */
function objectToUrl (obj) {
  let result = '';

  if (!obj) {
    return result;
  }

  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      let currentPropValue = obj[property];
      if (currentPropValue
        || currentPropValue === 0
        || currentPropValue === false) {
        result += (!result)
          ? `?${property}=${currentPropValue}`
          : `&${property}=${currentPropValue}`;
      }
    }
  }

  return result;
}

/**
 * Convertie la query string d'une url en objet
 * @param {string} urlQueryString - la query string e l'url sous la forme: ?paramName=Value&param2=value2
 * @returns {{}}
 */
function queryStringToObject (urlQueryString) {
  if (!urlQueryString) {
    return {};
  }

  if (urlQueryString && urlQueryString.charAt(0) === "?") {
    urlQueryString = urlQueryString.substr(1);
  }

  let result = {};
  let urlParams = urlQueryString.split("&");
  urlParams.forEach((urlParam) => {
    let param = (urlParam || "").split("=");
    if (param && param.length > 0) {
      result[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
    }
  });

  return result;
}


/**
 *
 * Display alert messages
 * @param {String} title
 * @param {String} message
 * @param {Array} buttons
 */
function alert (title, message, buttons) {
  Alert.alert(
    title,
    message,
    buttons
  );
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export {
  alert,
  ActionHelper,
  objectToUrl,
  queryStringToObject,
  ColorHelper
};