import React, { Component } from 'react';

import {
  Easing,
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import store from '../store';
import { fetchHorsesFromServer } from '../store/horseStore';

class Track extends Component {
  constructor() {
    super();
    this.state = {
      horseLinksNeeded: [],
    };
  }

  componentDidMount() {
    this.props.getHorses();
  }

  render() {
    const { horses, user, usersInRace } = this.props;
    const avatarUrl = horses
      .filter(horse => horse.id === user.horseId)
      .map(horse => horse.imgUrl)[0];
    const horsesInRace = usersInRace
      .map(obj => ({
        userId: obj.userId,
        place: obj.place,
        horseId: obj.userInfo.horseId,
        image: obj.userInfo.horse.imgUrl,
      }))
      .sort((horseA, horseB) => horseA.place - horseB.place);
    const horseIdsSortedByPlace = horsesInRace
      .sort((horseA, horseB) => horseB.place - horseA.place)
      .map(horse => horse.horseId);
    return (
      <View
        height={this.props.height}
        width={this.props.width}
        style={{
          marginTop: 300,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 400,
        }}
      >
        {horsesInRace.map(horse => {
          return (
            <Image
              key={horse.place}
              style={{ width: '25%', height: '25%' }}
              source={{ uri: horse.image }}
            />
          );
        })}
      </View>
    );
  }
}

//make this component available to the app
const mapState = ({ horses }) => ({ horses });
const mapDispatch = dispatch => ({
  getHorses: () => dispatch(fetchHorsesFromServer()),
});
export default connect(
  mapState,
  mapDispatch
)(Track);

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#ffe6e6',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    color: '#999',
    display: 'flex',
    height: 26,
    lineHeight: 26,
    position: 'relative',
    width: '27%',
  },
});
