import axios from "axios";
const server = "https://inside-track-server-boil.herokuapp.com";

// * ACTION TYPES

const GET_HORSES = "GET_HORSES"

// * INITIAL STATE
const defaultHorses = []

// * ACTION CREATORS
export const getHorses = horses => ({ type: GET_HORSES, horses})

// * THUNK CREATORS
export const fetchHorsesFromServer = () => async dispatch => {
  try {
    const res = await axios.get(`${server}/api/horses`)
    dispatch(getHorses(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default reducer = (state = defaultHorses, action) => {
  switch (action.type) {
    case GET_HORSES:
      return action.horses
    default: 
      return state
  }
}