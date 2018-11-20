import React, { Component } from 'react'
import { View, TouchableOpacity} from 'react-native'
import { me } from '../store/user'
import { fetchSingleRaceFromServer, postANewRace} from '../store/races'

export default class StartNewRace extends Component {
  
  render() {



    return (
      <View>

      </View>
    )
  }
}

const mapState = state => {
  return {
    race: state.races,
    user: state.user,
    friends: state.friends
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getRace: raceId => dispatch(fetchSingleRaceFromServer(raceId)),
    postRace: (name, length) => dispatch(postANewRace(name, length)),
    
  }
}
