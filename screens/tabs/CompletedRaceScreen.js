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
  instanceArr.push(userRaceInstance.userInfo.userName);
  instanceArr.push(userRaceInstance.percentImprovement);
  instanceArr.push(userRaceInstance.dailyAverage);
  instanceArr.push(userRaceInstance.place);
  return instanceArr;
};

class CompletedRace extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.fetchRaceUserData(this.props.raceId);
    await this.props.getSingleRace(this.props.raceId);
  }

  render() {
    const tableData = {
      tableHead: ['Players', 'Improvement', 'Daily Average', 'Place'],
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
            flexArr={[2, 2, 2, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={tableData.tableInfo}
              style={styles.row}
              flexArr={[2, 2, 2, 1]}
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
