import ApiCallLib from '../../../libs/api_call_lib';

function getCurrentWait(userId) {

  return {
    type: 'GET_CURRENT_WAIT',
    promise: ApiCallLib.get(`/wait/user/${userId}`, {})
  }
} // <= create

function requestWait(userId, eventId, numberWaiter) {

  return {
    type: 'REQUEST_WAIT',
    promise: ApiCallLib.post(`/wait`, {
      eventId: eventId,
      userId: userId,
      numberOfWaiters: numberWaiter
    })
  }
}

function generateCode(waitId, clientId) {
  return {
    type: 'GENERATE_CODE',
    promise: ApiCallLib.put(`/wait/${waitId}/generate-code/${clientId}`, {})
  }
}

export default {
  getCurrentWait,
  requestWait,
  generateCode
};