import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { me } from '../../store/user';
import { fetchRaceUserData } from '../../store/singleRaceUser';
import { fetchSingleRaceFromServer } from '../../store/races';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

const arrayGenerater = userRaceInstance => {
  const instanceArr = [];
  instanceArr.push(userRaceInstance.place);
  instanceArr.push(userRaceInstance.userInfo.userName);
  instanceArr.push(
    userRaceInstance.dailyAverage + userRaceInstance.differenceFromAverage
  );
  instanceArr.push(
    Math.round(
      userRaceInstance.raceInfo.length *
        (userRaceInstance.dailyAverage / 24 / 60)
    )
  );
  instanceArr.push(userRaceInstance.percentImprovement);
  return instanceArr;
};

class CompletedRace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPedometerAvailable: 'checking',
      pastStepCount: 0,
      averageSteps: 0,
      stepCountDuringGame: 0,
      days: 0,
      hasCompleted: false,
    };
  }

  async componentDidMount() {
    await this.props.fetchRaceUserData(this.props.raceId);
    await this.props.getSingleRace(this.props.raceId);
  }

  render() {
    const tableData = {
      tableHead: ['Place', 'Player', 'Steps Taken', 'Average', 'Improvement'],
      tableInfo: this.props.singleRaceUser
        .filter(el => el.acceptedInvitation)
        .sort((user1, user2) => user1.place - user2.place)
        .map(el => arrayGenerater(el)),
    };

    return (
      <View style={styles.tableContainer}>
        <Text style={styles.text}>
          Steps taken during the game: {this.state.stepCountDuringGame}{' '}
        </Text>
        <Text style={styles.text}>
          Average steps: {this.state.averageSteps}{' '}
        </Text>

        <Table borderStyle={{ borderColor: '#017EC2' }}>
          <Row
            data={tableData.tableHead}
            flexArr={[1, 1.5, 1.5, 1.5, 1.5]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={tableData.tableInfo}
              style={styles.row}
              flexArr={[1, 1.5, 1.5, 1.5, 1.5]}
              heightArr={[28, 28]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableContainer: {
    flex: 1,
    fontSize: 10,
    width: '100%',
    height: '50%',
    paddingTop: 20,
  },
  head: { height: 40, backgroundColor: '#014D7F' },
  wrapper: { flexDirection: 'row' },
  row: { height: 28, backgroundColor: '#9AE0FF' },
  text: { textAlign: 'center' },
});

const mapState = ({ singleRaceUser, races }) => ({
  singleRaceUser,
  races,
});

const mapDispatch = dispatch => ({
  fetchRaceUserData: raceId => dispatch(fetchRaceUserData(raceId)),
  getSingleRace: raceId => dispatch(fetchSingleRaceFromServer(raceId)),
});

export default connect(
  mapState,
  mapDispatch
)(CompletedRace);
