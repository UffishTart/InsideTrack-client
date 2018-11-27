import React, { Component } from 'react'
import { View, Modal, Text} from 'react-native'
import { connect } from 'react-redux'
import { fetchHorsesFromServer } from '../../store/horseStore'
import { TabView, SceneMap } from 'react-native-tab-view'
class HorseStore extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes: []
    }
    this.createScenes = this.createScenes.bind(this)

  }
  async componentDidMount() {
    await this.props.getHorses()
    const newRoutes = []
    this.props.horses.forEach(horse => (newRoutes.push({key: horse.name, title: horse.name})))
    this.setState({
      routes: newRoutes
    })
  }

  createScenes ( horseArray ) {
    const sceneObj = {}
    horseArray.forEach(horse => {
      sceneObj[horse.name] = () => <Text>{horse.name}</Text>
    })
    return sceneObj
  }

  render() {
    let sceneObj
    if (this.state.routes.length) {
      sceneObj = this.createScenes(this.props.horses)
    }
    return (
      <Modal>  
        {this.state.routes.length ? <TabView
          navigationState={this.state}
          renderScene={SceneMap(sceneObj)}
          onIndexChange={index => this.setState({ index })}
          /> : null}

      </Modal>
    )
  }
}

const mapState = state => {
  return {
    horses: state.horses
  }
}

const mapDispatch = dispatch => {
  return {
    getHorses: () => dispatch(fetchHorsesFromServer())
  }
}

export default connect(mapState, mapDispatch)(HorseStore)

