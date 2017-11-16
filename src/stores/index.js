import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "../reducers";

var store;

export default {
  configureStore: () => {
    const reducers = combineReducers({
      user: userReducer
    });
    store = createStore(reducers, applyMiddleware(thunk));
    return store;
  },
  currentStore: () => {
    return store;
  }
};
