import axios from 'axios';
const server = 'https://inside-track-server-boil.herokuapp.com';

const GET_ALL_USER_RACES = 'GET_ALL_USER_RACES';
const START_NEW_RACE = 'START_NEW_RACE';

const getAllUserRaces = races => ({
  type: GET_ALL_USER_RACES,
  races,
});

export const fetchUserRacesByUser = (
  userId,
  inviteIndicator
) => async dispatch => {
  try {
    const { data } = await axios.get(
      `${server}/api/userRaces/races/${userId}?acceptedInvitation=${inviteIndicator}`
    );
    const races = data;
    dispatch(getAllUserRaces(races));
  } catch (err) {
    console.log(err);
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USER_RACES:
      return action.races;
    case START_NEW_RACE:
      return [...state, action.race];
    default:
      return state;
  }
};

export default reducer;
