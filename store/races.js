import axios from "axios";
const server = "https://inside-track-server-boil.herokuapp.com";

const GET_ALL_RACES = "GET_ALL_RACES";
const START_NEW_RACE = "START_NEW_RACE";

const getAllRaces = races => ({
  type: GET_ALL_RACES,
  races
});

const startNewRace = race => ({
  type: START_NEW_RACE,
  race
});

export const fetchRacesDataFromServer = () => async dispatch => {
  try {
    const { data } = axios.get(`${server}/api/races`);
    const races = data;
    dispatch(getAllRaces(races));
  } catch (err) {
    console.log(err);
  }
};

export const postANewRace = (race, users) => async dispatch => {
  try {
    const { data } = axios.post(`${server}/api/races`);
    const race = data;
    dispatch(startNewRace(race));
  } catch (err) {
    console.log(err);
  }
};
const reducer = (state = [], action) => {
  switch (action) {
    case GET_ALL_RACES:
      return action.races;
    case START_NEW_RACE:
      return [...state, action.race];
    default:
      return state;
  }
};

export default reducer;
