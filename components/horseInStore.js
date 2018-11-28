import React, { Component } from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import {Button} from 'native-base'
import { connect } from 'react-redux';
import {me, updateHorse} from '../store/user'
class horseInStore extends Component {
  componentDidMount() {
    this.props.getUser()
  }
  render() {
    console.log('user id and horseid passed to updateHorse', this.props.user.id, this.props.horse.id)
    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          source={{uri: this.props.horse.imgUrl}}
        />
        <View style={styles.button}>
          <Button onPress={async () => {
            await this.props.updateHorse(this.props.user.id, this.props.horse.id) 
            this.props.toggleStore()
          }}
          style={styles.button}
          >
            <Text>Change Horse!</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: "100%",
    height: "50%"
  },
  button: {
    justifyContent: 'center',
  }
})

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  updateHorse: (userId, horseId) => dispatch(updateHorse(userId, horseId))
})

export default connect(mapState, mapDispatch)(horseInStore)

