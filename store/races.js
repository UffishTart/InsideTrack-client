import axios from 'axios';
const server = 'https://inside-track-server-boil.herokuapp.com';

const GET_ALL_RACES = 'GET_ALL_RACES';
const CREATE_NEW_RACE = 'CREATE_NEW_RACE';

const getAllRaces = races => ({
  type: GET_ALL_RACES,
  races,
});

const createNewRace = race => ({
  type: CREATE_NEW_RACE,
  race,
});

export const fetchRacesDataFromServer = () => async dispatch => {
  try {
    const { data } = await axios.get(`${server}/api/races`);
    const races = data;
    dispatch(getAllRaces(races));
  } catch (err) {
    console.log(err);
  }
};

export const fetchSingleRaceFromServer = raceId => async dispatch => {
  try {
    const { data } = await axios.get(`${server}/api/races/${raceId}`);
    const races = [data];
    dispatch(getAllRaces(races));
  } catch (err) {
    console.log(err);
  }
};

export const postANewRace = (name, length) => async dispatch => {
  try {
    const { data } = await axios.post(`${server}/api/races`, {
      name,
      length,
    });
    const race = data;
    dispatch(createNewRace(race));
    return race.id;
  } catch (err) {
    console.log(err);
  }
};

export const putARace = (raceId, updateObj) => async dispatch => {
  try {
    const res = await axios.put(`${server}/api/races/${raceId}/`, updateObj);
    dispatch(fetchSingleRaceFromServer(raceId));
  } catch (err) {
    console.log(err);
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_RACES:
      return action.races;
    case CREATE_NEW_RACE:
      return [...state, action.race];
    default:
      return state;
  }
};

export default reducer;
