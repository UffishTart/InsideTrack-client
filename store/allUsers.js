import axios from "axios";
const server = "https://inside-track-server-boil.herokuapp.com";

const GET_ALL_USERS = "GET_ALL_USERS";

const getAllUsers = users => ({ type: GET_ALL_USERS, users });

export const fetchAllUsers = () => async dispatch => {
  try {
    const { data } = await axios.get(`${server}/api/users`);
    const allUsers = data;
    dispatch(getAllUsers(allUsers));
  } catch (err) {
    console.log(err);
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
};

export default reducer;
