import axios from "axios";
const server = "https://inside-track-server-boil.herokuapp.com";

const GET_ALL_PENDING_USER_RACES = "GET_ALL_PENDING_USER_RACES";
const POST_NEW_PENDING_USER_RACE = "POST_NEW_PENDING_USER_RACE";

const getAllUserRaces = races => ({
  type: GET_ALL_PENDING_USER_RACES,
  races
});

const postPendingNewUserRace = entry => ({
  type: POST_NEW_PENDING_USER_RACE,
  entry
});

export const fetchPendingUserRacesByUser = (
  userId,
  queryType,
  queryBoolean
) => async dispatch => {
  try {
    const { data } = await axios.get(
      `${server}/api/userRaces/races/${userId}?${queryType}=${queryBoolean}`
    );
    const races = data;
    dispatch(getAllUserRaces(races));
  } catch (err) {
    console.log(err);
  }
};

export const postAUserRaceEntry = (
  userId,
  raceId,
  isOwner,
  acceptedInvitation
) => async dispatch => {
  try {
    const reqBody = { userId, raceId, isOwner, acceptedInvitation };
    const { data } = await axios.post(`${server}/api/userRaces/`, reqBody);
    const raceEntry = data;
    dispatch(postPendingNewUserRace(raceEntry));
  } catch (err) {
    console.log(err);
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PENDING_USER_RACES:
      return action.races;
    case POST_NEW_PENDING_USER_RACE:
      return [...state, action.entry];
    default:
      return state;
  }
};

export default reducer;
