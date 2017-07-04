import loaderHelpers from '../loader_helpers';

/**
  * Display a loader.
  * @param {bool|null} isPageLoading
  * @param {string?} message
  * @returns {{type: string, isPageLoading: bool|null, message: string?}}
  */
function loader(isPageLoading, message) {
  return {
    type: loaderHelpers.pageLoading,
    isPageLoading: isPageLoading,
    message: message
  };
}

export default {
  loader
};