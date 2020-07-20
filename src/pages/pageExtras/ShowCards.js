import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { startOfToday, format } from "date-fns";
import ExpenseTable from "./ExpenseTable";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const ShowCards = ({
  title,
  amount,
  buttonAction,
  size,
  open,
  tableData,
  tableAttributes,
  tableTitle,
  closeDialog,
  buttonRef,
}) => {
  const classes = useStyles();

  const setDateValue = () => {
    return format(startOfToday(), "MMM d, yyyy");
  };

  // useEffect(setDateValue, []);

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        ₹ {amount || "0.00"}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {setDateValue()}
      </Typography>
      <div>
        <Link color="primary" href={buttonRef} onClick={buttonAction}>
          View balances
        </Link>
      </div>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{tableTitle}</DialogTitle>
        <DialogContent>
          {(tableData && tableData.length && (
            <ExpenseTable
              tableData={tableData}
              tableAttributes={tableAttributes}
            />
          )) ||
            "No Data to display"}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ShowCards;
