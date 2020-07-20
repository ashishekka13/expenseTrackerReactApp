import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import MonetizationOnIcon from "@material-ui/icons/AttachMoney";

import { MainListItems, secondaryListItems } from "./pageExtras/listItems";
// import Chart from "./Chart";
import ShowCards from "./pageExtras/ShowCards";
import Orders from "./pageExtras/ExpenseTable";

import {
  useGetExpensesByDate,
  useCheckUsernameAvailability,
  useAddSharedUser,
  useSettleUpExpense,
} from "../services/expenseService";
import AddExpense from "./dialogs/AddExpense";
import { ERROR, FETCHING, SUCCESS } from "../hooks/useApiRequest/actionTypes";
import { STATUS, STORAGE_KEYS } from "../helpers/constants";
import {
  Fab,
  Select,
  MenuItem,
  InputLabel,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import Loader from "../extras/Loader";
import DateFnsUtils from "@date-io/date-fns";
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  startOfYear,
  startOfMonth,
  startOfWeek,
  startOfToday,
  endOfToday,
  endOfDay,
} from "date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const drawerWidth = 240;

export default function Home() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [
    { status: getExpensesByDateStatus },
    makeGetExpensesByDate,
  ] = useGetExpensesByDate();

  const [time, setTime] = React.useState("2016-06-22T19:10:25");
  const [tableData, setTableData] = React.useState([]);

  const [startDate, setStartDate] = React.useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = React.useState(endOfToday());
  const [option, setOption] = React.useState(2);
  const [unsettled, setUnsettled] = React.useState(false);

  const handleGetExpensesByDate = () => {
    makeGetExpensesByDate({ startDate, endDate, isSettled: unsettled }).then(
      ({ status, data }) => {
        if (status === STATUS.SUCCESS) {
          setTableData(data);
        }
      }
    );
  };

  const handleSelectChange = ({ target }) => {
    // const {event} = target;
    const { value } = target;
    setOption(value);
    if (value <= 3) {
      // setStartDate(new Date());
      setEndDate(endOfToday);
      setUnsettled(false);
    }
    console.log(value);
    switch (value) {
      case 0:
        setStartDate(startOfToday());
        break;
      case 1:
        setStartDate(startOfWeek(new Date()));
        break;
      case 2:
        setStartDate(startOfMonth(new Date()));
        break;
      case 3:
        setStartDate(startOfYear(new Date()));
        break;
      case 4:
        setUnsettled(true);
        break;
      case 5:
        setUnsettled(false);
        break;
      default:
        break;
    }
  };

  useEffect(handleGetExpensesByDate, []);

  const renderToolbar = () => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid
          container
          spacing={3}
          direction="row"
          alignItems="flex-end"
          justify="space-evenly"
        >
          <Grid item xs={3} style={{ paddingBottom: "10px" }}>
            <InputLabel size="small"></InputLabel>
            <Select
              id="select"
              fullWidth
              value={option}
              onChange={handleSelectChange}
              style={{ marginBottom: "10px" }}
            >
              <MenuItem value={0}>Today</MenuItem>
              <MenuItem value={1}>This Week</MenuItem>
              <MenuItem value={2}>This Month</MenuItem>
              <MenuItem value={3}>This Year</MenuItem>
              <MenuItem value={4}>Unsettled Expenses</MenuItem>
              <MenuItem value={5}>Custom</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <KeyboardDatePicker
              variant="inline"
              format="MMM d, yyyy"
              margin="normal"
              name="startDate"
              label="Start Date"
              value={startDate}
              onChange={(d) => {
                setStartDate(d);
                if (option < 4) setOption(5);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <KeyboardDatePicker
              variant="inline"
              margin="normal"
              id="endDate"
              label="End Date"
              format="MMM d, yyyy"
              value={endDate}
              onChange={(d) => {
                setEndDate(endOfDay(d));
                if (option < 4) setOption(5);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item xs={1} style={{ paddingBottom: "10px" }}>
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              style={{ marginBottom: "10px" }}
              onClick={handleGetExpensesByDate}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  };

  const RenderAddFriend = ({ open, closeDialog, callBack, id }) => {
    const [
      { status: checkUsernameAvailabilityStatus },
      makeCheckUsernameAvailabilty,
    ] = useCheckUsernameAvailability();

    const [friendName, setFriendName] = useState("");
    const [userExists, setUserExists] = useState(false);

    const handleCheckUsername = (username) => {
      makeCheckUsernameAvailabilty({ username }).then(({ status, data }) => {
        if (status == STATUS.SUCCESS) {
          setUserExists(data);
          console.log(data);
        }
      });
    };

    const handleChange = ({ target }) => {
      const { value } = target || "";
      setFriendName(value);
      handleCheckUsername(value);
    };

    const [
      { status: addSharedUserStatus },
      makeAddSharedUser,
    ] = useAddSharedUser();

    const handleAddClick = () => {
      makeAddSharedUser({ sharedUser: friendName, id }).then(
        ({ status, message }) => {
          if (status === STATUS.SUCCESS) {
            callBack();
            closeDialog();
          }
        }
      );
    };
    // const [open, setOpen] = useState(true);

    return (
      <Dialog open={open}>
        <DialogTitle id="form-dialog-title">Tag a Friend</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            size="small"
            value={friendName}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {checkUsernameAvailabilityStatus === FETCHING ? (
                    <CircularProgress size={20} />
                  ) : userExists ? (
                    <CheckCircleIcon htmlColor="green" />
                  ) : (
                    <ErrorIcon color="error" />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={!userExists}
            onClick={handleAddClick}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const [addFriendDialogOpen, setAddFriendDialogOpen] = useState(false);
  const closeAddFriendDialog = () => {
    // setAddFriendDialogOpen((prev) => !prev);
    setAddFriendDialogOpen(false);
  };
  const openAddFriendDialog = (id) => {
    setAddFriendDialogOpen(true);
    setCurrentId(id);
  };

  const [currentId, setCurrentId] = useState(0);

  const [
    { status: settleUpExpenseStatus },
    makeSettleUpExpense,
  ] = useSettleUpExpense();

  const handleSettleUpBalances = (id) => {
    makeSettleUpExpense({ id }).then(({ status }) => {
      if (status === STATUS.SUCCESS) {
        handleGetExpensesByDate(); //Implement a local refresh instead later.
      }
    });
  };

  return (
    <div>
      {getExpensesByDateStatus === FETCHING ? (
        <Loader />
      ) : (
        <div>
          {addFriendDialogOpen && (
            <RenderAddFriend
              open={addFriendDialogOpen}
              closeDialog={closeAddFriendDialog}
              callBack={handleGetExpensesByDate}
              id={currentId}
            />
          )}
          <AddExpense />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <MaterialTable
                  data={tableData}
                  title="Expense History"
                  columns={[
                    { title: "Expense#", field: "id", align: "left" },
                    {
                      title: "Date and Time",
                      field: "time",
                      align: "center",
                      render: (row) =>
                        format(new Date(row.time), "MMM d, yyyy HH:mm"),
                    },
                    {
                      title: "Amount",
                      field: "amount",
                      align: "right",
                      render: (row) => "₹" + row.amount,
                    },
                    {
                      title: "Settle Up",
                      size: "small",
                      field: "settled",
                      align: "center",
                      render: (rowData) =>
                        rowData.sharedUser && (
                          <div>
                            {rowData.settled ? (
                              <CheckCircleIcon htmlColor="green" />
                            ) : (
                              <IconButton
                                onClick={() =>
                                  handleSettleUpBalances(rowData.id)
                                }
                              >
                                {settleUpExpenseStatus === FETCHING ? (
                                  <CircularProgress
                                    size={20}
                                    className={classes.fabProgress}
                                  />
                                ) : (
                                  <MonetizationOnIcon />
                                )}
                              </IconButton>
                            )}
                          </div>
                        ),
                    },
                    {
                      title: "Tagged Friend",
                      field: "sharedUser",
                      align: "center",
                      render: (rowData) =>
                        rowData.sharedUser || (
                          <div>
                            <IconButton
                              onClick={() => openAddFriendDialog(rowData.id)}
                            >
                              <PersonAddIcon />
                            </IconButton>
                          </div>
                        ),
                    },
                    { title: "Description", field: "remarks", align: "left" },
                  ]}
                  components={{
                    Toolbar: (props) => (
                      <div>
                        <MTableToolbar {...props} />
                        <div style={{ padding: "0px 10px" }}>
                          {renderToolbar()}
                        </div>
                      </div>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 180,
  },
  fab: {
    margin: theme.spacing(1),
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 999,
  },
  gridSelect: {
    paddingBottom: "10px",
  },
}));
