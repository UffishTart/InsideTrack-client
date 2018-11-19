//import liraries
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import RacesList from '../../components/RacesList'
import { TabView, SceneMap } from 'react-native-tab-view';
// import { fetchRacesDataFromServer, fetchSomeSortOfPedoData} from '../../store/races'
// import { connect } from 'react-redux'

// create a component
class Races extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Current Races' },
      { key: 'second', title: 'Past Races' },
    ],
    races: [
      {
        name: 'first race',
        length: 'day',
        completedStatus: false
      },
      {
        name: 'second race',
        length: 'day',
        completedStatus: false
      },
      {
        name: 'third race',
        length: 'day',
        completedStatus: false
      },
      {
        name: 'fourth race',
        length: 'day',
        completedStatus: false
      },
      {
        name: 'fifth race',
        length: 'day',
        completedStatus: false
      },
      {
        name: 'first past race',
        length: 'day',
        completedStatus: true
      },
      {
        name: 'second past race',
        length: 'day',
        completedStatus: true
      },
      {
        name: 'third past race',
        length: 'day',
        completedStatus: true
      },
      {
        name: 'fourth past race',
        length: 'day',
        completedStatus: true
      },
      {
        name: 'fifth past race',
        length: 'day',
        completedStatus: true
      }
    ]
  }

  componentDidMount() {
    // this.props.fetchSomeSortOfPedoData()
    // this.props.fetchRacesDataFromServer()

  }

  render() {

    //the request will be for currRaces for this user
    //each of these races will have an id for a key
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => <RacesList races={this.state.races} inProgressBool={true} />,
          second: () => <RacesList races={this.state.races} inProgressBool={false} />,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />
    );
  }
}

const mapState = state => {
  return {
    races: state.races
  }
}

const mapDispatch = state => {
  return {
    getRaces: () => console.log('we dont have a get races thunk yet!')
  }
}


//make this component available to the app
// export default connect(mapState, mapDispatch)(Races)

export default Races

