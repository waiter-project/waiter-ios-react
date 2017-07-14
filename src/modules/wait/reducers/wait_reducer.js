import Immutable from 'immutable';

const defaultState = new Immutable.fromJS({
    wait: {}
});

function wait_reducer (state = defaultState, action) {
  let nextState;
  switch (action.type) {

    case 'GET_CURRENT_WAIT_SUCCESS':
        return state.set("wait", action.data.data.wait);

    case 'GET_CURRENT_WAIT_FAILURE':

        return state.set("wait", {});

    case 'GENERATE_CODE_SUCCESS':
      let newWait = state.toJS().wait;
      newWait.confirmationCode = action.data.data.code;
      console.log(action.data.data.code);
      return state.set("wait.confirmationCode", newWait);

    case 'GENERATE_CODE_SUCCESS':
      return state;

    default:
        return state;
  }
}

export default wait_reducer;
