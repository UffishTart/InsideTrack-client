import axios from 'axios';
const server = 'https://inside-track-server-boil.herokuapp.com';

const GET_RACE_USERS = 'GET_RACE_USERS';
const UPDATE_PEDO_DATA = 'UPDATE_PEDO_DATA';

const getRaceUsers = raceUsers => ({
  type: GET_RACE_USERS,
  raceUsers,
});
// const updatePedoData =

export const fetchRaceUserData = raceId => async dispatch => {
  try {
    const { data } = await axios.get(`${server}/api/userRaces/${raceId}`);
    const users = data;
    dispatch(getRaceUsers(users));
  } catch (err) {
    console.log(err);
  }
};
export const putUpdatedPedometerData = (
  dayPedoOutput,
  userId,
  raceId
) => async dispatch => {
  try {
    const result = await axios.get(
      `${server}/api/userRaces/${raceId}/${userId}`
    );
    const userRace = result.data[0];
    const newDifferenceFromAverage =
      Number(dayPedoOutput) - Number(userRace.dailyAverage);
    const newPercentageImprovement =
      Number(newDifferenceFromAverage) / Number(userRace.dailyAverage);

    const res = await axios.put(`${server}/api/userRaces/${raceId}/${userId}`, {
      differenceFromAverage: newDifferenceFromAverage,
      percentImprovement: newPercentageImprovement,
    });

    const allUsersInRace = await axios.get(`${server}/api/userRaces/${raceId}`);
    const updatedUsers = [];
    const sortedUsersArray = allUsersInRace.data
      .sort(
        (user1, user2) => user2.percentImprovement - user1.percentImprovement
      )
      .map(async (sortedUser, index) => {
        try {
          return await axios.put(
            `${server}/api/userRaces/${raceId}/${sortedUser.userId}`,
            {
              place: index + 1,
            }
          );
        } catch (err) {
          console.log(err);
        }
      });
    const resolved = await Promise.all(sortedUsersArray);
    dispatch(fetchRaceUserData(raceId));
  } catch (err) {
    console.log(err);
  }
};

export const updateRaceUserData = (
  userId,
  raceId,
  updateObj
) => async dispatch => {
  try {
    await axios.put(`${server}/api/userRaces/${raceId}/${userId}`, updateObj);
    dispatch(fetchRaceUserData(raceId));
  } catch (err) {
    console.log(err);
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_RACE_USERS:
      return action.raceUsers;
    default:
      return state;
  }
};

export default reducer;
