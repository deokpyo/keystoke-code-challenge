import constants from "../constants";

var initialState = {
  list: [], // store all users in array
  currentUser: null
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);
  switch (action.type) {
    case constants.USERS_RECEIVED:
      updated["list"] = action.users;
      return updated;

    case constants.USER_CREATED:
      let updatedList = Object.assign([], updated.list);
      updatedList.push(action.user);
      updated["list"] = updatedList;
      updated["currentUser"] = action.user;
      return updated;

    case constants.CURRENT_USER_RECEIVED:
      updated["currentUser"] = action.user;
      return updated;

    default:
      return state;
  }
};
