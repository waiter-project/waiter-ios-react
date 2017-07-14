import ApiCallLib from '../../../libs/api_call_lib';

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------

function getAllEvents() {

  return {
    type: 'GET_ALL_EVENTS',
    promise: ApiCallLib.get(`/event`, {})
  }
} // <= create


function getOneEvent(eventId) {

  return {
    type: 'GET_ONE_EVENT',
    promise: ApiCallLib.get(`/event/${eventId}`, {})
  }
} // <= create

function registerToEvent(eventId, waiterId) {

  return {
    type: 'EVENT_REGISTER',
    promise: ApiCallLib.put(`/event/${eventId}/join/${waiterId}`, {})
  }
}

function unregisterToEvent(eventId, waiterId) {

  return {
    type: 'EVENT_REGISTER',
    promise: ApiCallLib.put(`/event/${eventId}/leave/${waiterId}`, {})
  }
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

export default {
    getAllEvents,
    getOneEvent,
    registerToEvent,
    unregisterToEvent
};
