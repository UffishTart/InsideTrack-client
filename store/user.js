import axios from "axios";
const server = "https://inside-track-server-boil.herokuapp.com";
import { onSignIn, onSignOut } from "../navigation/AsyncStorageAuth";

// import history from '../history'

//  * ACTION TYPES

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

//  * INITIAL STATE
const defaultUser = {};

//  * ACTION CREATORS
export const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

// * THUNK CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get(`${server}/auth/me`);
    console.log(res.data);
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  console.log("should say login", method);
  try {
    res = await axios.post(`${server}/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    onSignIn(res.data);
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post(`${server}/auth/logout`);
    dispatch(removeUser());
    onSignOut();
  } catch (err) {
    console.error(err);
  }
};

// * REDUCER
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
