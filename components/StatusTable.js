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
        <View style={{ marginTop: "15%", justifyContent: "center" }}>
          <Image
            style={{ marginLeft: "25%" }}
            source={require("../assets/cupCopy.png")}
          />

          <Table borderStyle={{ borderColor: "transparent" }}>
            <Row
              data={tableData.tableHead}
              flexArr={[1, 1.5, 1.75, 1.25, 1.75]}
              style={styles.head}
              textStyle={styles.text}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={tableData.tableInfo}
                style={styles.row}
                flexArr={[1, 1.5, 1.75, 1.25, 1.75]}
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
  head: {
    height: 40,
    backgroundColor: "#535354",
    opacity: 0.7
  },
  text: {
    fontFamily: "type writer",
    textAlign: "center",
    fontWeight: "100"
  },
  wrapper: { flex: 1, flexDirection: "row", justifyContent: "center" },
  row: { height: 28 },
  photo: {
    width: "100%",
    height: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },

  headerContainer: {
    width: "100%",
    paddingLeft: "40%"
  }
});
