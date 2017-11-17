import constants from "../constants";

export default {
  usersReceived: users => {
    return {
      type: constants.USERS_RECEIVED,
      users: users
    };
  },
  userCreated: user => {
    return {
      type: constants.USER_CREATED,
      user: user
    };
  },
  userUpdated: user => {
    return {
      type: constants.USER_UPDATED,
      user: user
    };
  },
  currentUserReceived: user => {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      user: user
    };
  }
};
