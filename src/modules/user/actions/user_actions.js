import ApiCallLib from '../../../libs/api_call_lib';

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------

function updatePassword(updatedPassword) {

  console.log(updatedPassword)

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

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


export default {
  updatePassword,
  getUser,
  updateUser
};
