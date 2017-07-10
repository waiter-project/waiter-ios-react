import Immutable from 'immutable';
//import LocalStorage from 'localStorage';

const defaultState = new Immutable.fromJS({
    events: [],
    current: {}
});

function events_reducer (state = defaultState, action) {
  let nextState;
  switch (action.type) {

    case 'GET_ALL_EVENTS_SUCCESS':
        return state.set("events", action.data.data.events);

    case 'GET_ALL_EVENTS_FAILURE':
        return state;

    case 'GET_ONE_EVENT_SUCCESS':
        return state.set("current", action.data.data.event);

    case 'GET_ONE_EVENT_FAILURE':
        return state;

    default:
        return state;
  }
}

export default events_reducer;
