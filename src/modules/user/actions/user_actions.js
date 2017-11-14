import ApiCallLib from '../../../libs/api_call_lib';

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------

function updatePassword(updatedPassword) {
  return {
    type: 'PASSWORD_UPDATE',
    promise: ApiCallLib.put(`/user/${updatedPassword.userId}/password`, {
      "password": updatedPassword.password,
      "newPassword": updatedPassword.newPassword
    })
  }
} // <= create

function updateUser(updatedProfile) {

  return {
    type: 'PROFILE_UPDATE',
    info: {
      "firstName": updatedProfile.firstName,
      "lastName": updatedProfile.lastName,
      "email": updatedProfile.email
    },
    promise: ApiCallLib.put(`/user/${updatedProfile.userId}/profile`, {
      "firstName": updatedProfile.firstName,
      "lastName": updatedProfile.lastName,
      "email": updatedProfile.email
    })
  }
} // <= create

function getUser(userId) {
    return {
        type: "GET_USER",
        promise: ApiCallLib.get(`/user/${userId}`, {})
    }
}

function getPastWaits(userId) {
    return {
        type: "GET_PAST_WAITS",
        promise: ApiCallLib.get(`/wait/user/${userId}/history`, {})
    }
}

function getCards(userId) {
  return {
      type: "GET_CARDS",
      promise: ApiCallLib.get(`/user/${userId}/get-cards`, {})
  }
}

function  saveCard(userId, token) {
  console.log("xouxou")
  return {
      type: "SAVE_CARD",
      info: {
        "cardToken": token
      },
      promise: ApiCallLib.put(`/user/${userId}/add-new-card/${token}`, {
        userId: userId,
        cardToken: token
      })
  }
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


export default {
  updatePassword,
  getUser,
  updateUser,
  getPastWaits,
  getCards,
  saveCard
};
