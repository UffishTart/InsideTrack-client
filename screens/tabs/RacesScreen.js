//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import CurrentRaces from '../../components/CurrentRaces'
import PastRaces from '../../components/PastRaces'
import { TabView, SceneMap } from 'react-native-tab-view';
// import { fetchRacesDataFromServer, fetchSomeSortOfPedoData} from '../../store/races'
// import { connect } from 'react-redux'

const currRaces = [
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
  }
]

const pastRaces = [
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

const FirstRoute = () => (
  <View style={[styles.flexCont, { backgroundColor: 'red' }]}>
    <ScrollView>
      {currRaces && currRaces.map(race => {
        return (
          <CurrentRaces key={race.name} race={race} />
        )
      })}
    </ScrollView>
  </View>
)

const SecondRoute = () => (
  <View style={[styles.flexCont, { backgroundColor: 'blue' }]}>
    <ScrollView>
      {currRaces && currRaces.map(race => {
        return (
          <PastRaces key={race.name} race={race} />
        )
      })}
    </ScrollView>
  </View>
)


// create a component
class Races extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Current Races' },
      { key: 'second', title: 'Past Races' },
    ],
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
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flexCont: {
    flex: 1
  }
});

// const mapState = state => {
//   return {
//     races: state.races
//   }
// }

// const mapDispatch = { fetchRacesDataFromServer, fetchSomeSortOfPedoData }


//make this component available to the app
// export default connect(mapState, mapDispatch)(Races)
// export default connect(mapState)(Races)
export default Races

