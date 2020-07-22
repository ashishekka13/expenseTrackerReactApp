import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { format, startOfToday } from "date-fns";
import React from "react";
import ExpenseTable from "./ExpenseTable";
import Title from "./Title";

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

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        ₹{" "}
        {isNaN(parseFloat(amount).toFixed(2))
          ? "0.00"
          : parseFloat(amount).toFixed(2)}
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
