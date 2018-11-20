import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { me } from "../../store/user";
import {
  putUpdatedPedometerData,
  fetchRaceUserData
} from "../../store/singleRaceUser";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";

//import ExampleTwo from "../../components/PastRaceInfo";

const arrayGenerater = userRaceInstance => {
  const instanceArr = [];
  // [ "Players", "Improvement", "Past Steps", "Place"]
  instanceArr.push(userRaceInstance.userInfo.userName);
  instanceArr.push(userRaceInstance.percentImprovement);
  instanceArr.push(userRaceInstance.dailyAverage);
  instanceArr.push(userRaceInstance.place);
  return instanceArr;
};

//Helper funtion that can check if user have 7 full days info to generate the average steps
const ifHaveSevenDaysData = (createdDate, usingDate) => {
  if (
    createdDate.getFullYear() <= usingDate.getFullYear() &&
    createdDate.getMonth() < usingDate.getMonth()
  ) {
    return true;
  } else {
    const difference = usingDate.getDate() - createdDate.getDate();
    return difference >= 7;
  }
};
class PedometerSensor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      averageSteps: 0,
      currentStepCount: 0,
      days: 0,
      startMonth: 0,
      endMonth: 0
    };
  }

  async componentDidMount() {
    await this.props.fetchRaceUserData(this.props.raceId);
    await this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const createdDate = this.props.user.createdAt;
    const userStartDate = new Date(createdDate);
    let start;
    //If user have 7 days data, set the start date to 7 days ago
    if (ifHaveSevenDaysData(userStartDate, end)) {
      start = new Date();
      start.setDate(end.getDate() - 7);

      //if not, set the date to the day user was created in the database
    } else {
      start = userStartDate;
    }

    Pedometer.getStepCountAsync(start, end)
      .then(
        result => {
          let daysChecking = ifHaveSevenDaysData(start, end)
            ? 7
            : end.getDate() - start.getDate();
          let average = ifHaveSevenDaysData(start, end)
            ? Math.round(result.steps / daysChecking)
            : this.props.user.estimatedAverage;
          this.setState({
            pastStepCount: result.steps,
            days: daysChecking,
            averageSteps: average,
            startMonth: start.getMonth(),
            endMonth: end.getMonth()
          });
        },
        error => {
          this.setState({
            pastStepCount: "Could not get stepCount: " + error
          });
        }
      )
      .then(() =>
        this.props.putUpdatedPedometerData(
          this.state.pastStepCount,
          this.props.user.id,
          1
        )
      );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    const tableData = {
      tableHead: ["Players", "Improvement", "Daily Average", "Place"],
      tableInfo: this.props.singleRaceUser
        .filter(el => el.acceptedInvitation)
        .map(el => arrayGenerater(el))
    };

    return (
      <View style={styles.tableContainer}>
        <Table>
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
    alignItems: "center",
    justifyContent: "center"
  },
  tableContainer: {
    flex: 1,
    fontSize: 10,
    width: "100%",
    height: "auto",
    borderColor: "transparent",
    backgroundColor: "#9AE0FF",
    paddingTop: 10
  },
  head: { height: 40, backgroundColor: "#014D7F" },
  wrapper: { flexDirection: "row" },
  row: { height: 28 },
  text: { textAlign: "center" }
});

const mapState = ({ singleRaceUser }) => ({ singleRaceUser });
const mapDispatch = dispatch => ({
  fetchRaceUserData: raceId => dispatch(fetchRaceUserData(raceId)),
  putUpdatedPedometerData: (dayPedoOutput, userId, raceId) =>
    dispatch(putUpdatedPedometerData(dayPedoOutput, userId, raceId))
});

export default connect(
  mapState,
  mapDispatch
)(PedometerSensor);

// <View style={styles.container}>
//             <View>
//               <Text>
//                 Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
//               </Text>
//               <Text>user info: {this.props.user.email}</Text>
//               <Text>average steps: {this.state.averageSteps}</Text>
//               <Text>days:{this.state.days}</Text>
//               <Text>state month:{this.state.startMonth}</Text>
//               <Text>end month:{this.state.endMonth}</Text>
//               <Text>
//                 Steps taken in the last 24 hours: {this.state.pastStepCount}
//               </Text>
//               <Text>
//                 Walk! And watch this go up: {this.state.currentStepCount}
//               </Text>
//               <Text>Users</Text>
//               <View>
//                 {this.props.singleRaceUser.map(user => {
//                   return (
//                     <View key={user.userId}>
//                       <Text>{user.place}</Text>
//                     </View>
//                   );
//                 })}
//               </View>
//             </View>
//           </View>
