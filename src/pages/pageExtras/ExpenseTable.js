import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ExpenseTable({
  tableData,
  tableAttributes,
  tableName,
  tableActionLabel,
  tableAction,
  buttonRef,
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* {console.log(tableData)} */}
      <Title>{tableName}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {tableAttributes.map((col) => (
              <TableCell align={col.align}>{col.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(tableData &&
            tableData.length &&
            tableData.map((row) => (
              <TableRow key={row["id"]}>
                {tableAttributes.map((col) => (
                  <TableCell
                    align={col.align}
                    style={{
                      color: row.color ? col.primaryColor : col.secondaryColor,
                      fontWeight: col.fontWeight,
                    }}
                  >
                    {row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))) ||
            "   "}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href={buttonRef}>
          {tableActionLabel}
        </Link>
      </div>
    </React.Fragment>
  );
}
