import actionHelpers from '../../helpers/action_helper';

const LOADING = 'PAGE_LOADING';

export default {
  pageLoading: LOADING,
  pageLoadingFailure: `${LOADING}_${actionHelpers.failure}`,
  pageLoadingRequest: `${LOADING}_${actionHelpers.request}`,
  pageLoadingSuccess: `${LOADING}_${actionHelpers.success}`
};