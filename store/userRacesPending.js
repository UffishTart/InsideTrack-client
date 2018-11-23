import axios from "axios";
const server = "https://inside-track-server-boil.herokuapp.com";

const GET_PENDING_RACES = "GET_PENDING_RACES";

const getPeddingRaces = races => ({ type: GET_PENDING_RACES, races });

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
    dispatch(getPeddingRaces(races));
  } catch (err) {
    console.log(err);
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_PENDING_RACES:
      return action.races;
    default:
      return state;
  }
};
export default reducer;
