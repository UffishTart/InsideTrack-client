import React, { Component } from "react";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
import { StyleSheet, ImageBackground, View, Image } from "react-native";

class StatusTable extends Component {
  render() {
    const { tableData } = this.props;
    return (
      <ImageBackground
        style={styles.photo}
        source={require("../assets/leaderboard.png")}
      >
        <View style={{ marginTop: "10%", justifyContent: "center" }}>
          <Image
            style={{ marginLeft: "25%" }}
            source={require("../assets/cupCopy.png")}
          />

          <Table borderStyle={{ borderColor: "transparent" }}>
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
      </ImageBackground>
    );
  }
}

export default StatusTable;

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    fontSize: 10,
    width: "100%",
    height: "50%",
    marginTop: 100
  },
  head: {
    height: 40,
    backgroundColor: "#535354",
    //flex: 1,
    opacity: 0.7,
    justifyContent: "center"
  },
  wrapper: { flex: 1, flexDirection: "row" },
  row: { height: 28 },
  photo: { width: "100%", height: "80%" },

  headerContainer: {
    width: "100%",
    paddingLeft: "40%"
  }
});
