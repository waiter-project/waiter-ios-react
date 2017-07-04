import actionHelpers from '../../helpers/action_helper';

const INIT = 'AUTHENTICATION_INIT';
const CREATE = 'AUTHENTICATION_CREATE';
const DESTROY = 'AUTHENTICATION_DESTROY';
const RESET = 'AUTHENTICATION_RESET';

export default {
  create: CREATE,
  createFailure: `${CREATE}_${actionHelpers.failure}`,
  createRequest: `${CREATE}_${actionHelpers.request}`,
  createSuccess: `${CREATE}_${actionHelpers.success}`,
  destroy: DESTROY,
  destroyFailure: `${DESTROY}_${actionHelpers.failure}`,
  destroyRequest: `${DESTROY}_${actionHelpers.request}`,
  destroySuccess: `${DESTROY}_${actionHelpers.success}`,
  init: INIT,
  initFailure: `${INIT}_${actionHelpers.failure}`,
  initRequest: `${INIT}_${actionHelpers.request}`,
  initSuccess: `${INIT}_${actionHelpers.success}`,
  reset: RESET,
  resetFailure: `${RESET}_${actionHelpers.failure}`,
  resetRequest: `${RESET}_${actionHelpers.request}`,
  resetSuccess: `${RESET}_${actionHelpers.success}`
};