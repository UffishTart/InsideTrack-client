import axios from "axios";
const server = "https://inside-track-server-boil.herokuapp.com";

const GET_ALL_FRIENDS_OF_USER = "GET_ALL_FRIENDS_OF_USER";
const ADD_NEW_FRIEND = "ADD_NEW_FRIEND";

const getAllFriends = friends => ({
  type: GET_ALL_FRIENDS_OF_USER,
  friends
});

const addANewFriend = friend => ({
  type: ADD_NEW_FRIEND,
  friend
});

export const fetchAllFriendsFromServer = () => async dispatch => {
  try {
    const { data } = await axios.get(`${server}/api/userFriends`);
    const friends = data;
    dispatch(getAllFriends(friends));
  } catch (err) {
    console.log(err);
  }
};

export const getFriendsOfUser = userId => async dispatch => {
  try {
    const { data } = await axios.get(`${server}/api/userFriends/${userId}`);
    const friends = data;
    dispatch(getAllFriends(friends));
  } catch (err) {
    console.log(err);
  }
};

export const addNewFriend = (userId, friendId) => async dispatch => {
  try {
    const { data } = await axios.post(`${server}/api/userFriends/`, {
      friendId,
      userId
    });
    const friend = data;

    await axios.post(`${server}/api/userFriends/`, {
      userId: friendId,
      friendId: userId
    });
    dispatch(getFriendsOfUser(userId));
  } catch (err) {
    console.log(err);
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_FRIENDS_OF_USER:
      return action.friends;
    case ADD_NEW_FRIEND:
      return [...state, action.friend];
    default:
      return state;
  }
};

export default reducer;
