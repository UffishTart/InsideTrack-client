import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import races from "./races";
import userRaces from "./userRaces";
import userRacesPending from "./userRacesPending";
import singleRaceUser from "./singleRaceUser";
import userFriend from "./userFriend";
import allUsers from "./allUsers";

const reducer = combineReducers({
  user,
  races,
  userRaces,
  singleRaceUser,
  userFriend,
  allUsers,
  userRacesPending
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
  //disabled redux logger because it is not helpful with react native
  // , createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./races";
export * from "./userRaces";
export * from "./singleRaceUser";
export * from "./userFriend";
