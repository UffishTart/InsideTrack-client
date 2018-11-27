import React, { Component } from "react";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
import { StyleSheet } from "react-native";

class StatusTable extends Component {
  render() {
    const { tableData } = this.props;
    return (
      <Table borderStyle={{ borderColor: "#017EC2" }}>
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
    marginTop: 200
  },
  head: { height: 40, backgroundColor: "#014D7F" },
  wrapper: { flexDirection: "row" },
  row: { height: 28, backgroundColor: "#9AE0FF" }
});
