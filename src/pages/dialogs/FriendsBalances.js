import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  InputAdornment,
  Slide,
  TextField,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import SnackAlert from "../formElements/snackBarAlert";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
// import MaterialTable from "material-table";
import clsx from "clsx";
import React, { useState } from "react";
import { STATUS } from "../../helpers/constants";
import { useCreateNewExpense } from "../../services/expenseService";

const FriendsBalances = ({ callBack }) => {
  const [remarks, setRemarks] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    token: false,
  });

  const messageAlert = (message) => {
    if (message !== undefined) {
      setSnackbar((prev) => ({ open: true, message, token: !prev.token }));
    }
  };
  const [
    { response: createNewExpenseResponse },
    makeCreateNewExpense,
  ] = useCreateNewExpense();

  const handleAddNewExpenseClick = () => {
    makeCreateNewExpense({ remarks, amount, time }).then(
      ({ status, data, message }) => {
        if (status === STATUS.SUCCESS) {
          console.log("product added");
          handleClose();
          callBack();
        }
      }
    );
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "remarks":
        setRemarks(value);
        break;
      case "amount":
        setAmount(value);
        break;
      case "time":
        setTime(value);
        break;
      default:
        break;
    }
  };

  const clearFields = () => {
    setAmount("");
    setTime("");
    setRemarks("");
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [addNew, setAddNew] = React.useState(false);

  function handleClickOpen() {
    setAddNew(true);
  }

  function handleClose() {
    setAddNew(false);
    clearFields();
  }

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <SnackBarAlert {...snackbar} />
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={handleClickOpen}
        // onClick={handleAddProductClick}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={addNew}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen={fullScreen}
        // scroll="body"
      >
        <DialogTitle id="form-dialog-title">Add a New Expense</DialogTitle>
        <DialogContent dividers={fullScreen}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="remarks"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Description"
                  value={remarks}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  name="amount"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Amount"
                  value={amount}
                  fullWidth
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="time"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Date and Time"
                  value={time}
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleAddNewExpenseClick}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FriendsBalances;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  appBar: {
    position: "sticky",
  },
  margin: {
    // margin: theme.spacing(1)
    // padding: theme.spacing(1),
  },
  textField: {
    // flexBasis: 200,
    // width:  `calc(100%)`,
    backgroundColor: "white",
    // margin: theme.spacing(1)
  },
  formField: {
    padding: theme.spacing(1),
  },
  text: {
    fontSize: 14,
  },
  inputText: {
    fontSize: 25,
    lineHeight: 2.4,
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 14,
    width: `calc(100%)`,
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  cards: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  head: {
    // backgroundColor: "black",
    // color: 'white',
  },
  expansionBody: {
    // backgroundColor: "#FAFAFA"
  },
  fab: {
    margin: theme.spacing(1),
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 999,
  },
}));
