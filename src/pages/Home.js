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
import { MainListItems, secondaryListItems } from "./pageExtras/listItems";
import Chart from "./pageExtras/Chart";
import ShowCards from "./pageExtras/ShowCards";
import Orders from "./pageExtras/ExpenseTable";
import {
  useGetTotalBalanceAmount,
  useGetPendingBalanceAmount,
  useGetRecentExpenses,
  useGetPendingBalances,
  useGetTotalBalances,
  useLogoutRequest,
} from "../services/expenseService";
import AddExpense from "./dialogs/AddExpense";
import { ERROR, FETCHING, SUCCESS } from "../hooks/useApiRequest/actionTypes";
import { STATUS, STORAGE_KEYS } from "../helpers/constants";
import Loader from "../extras/Loader";
import { format } from "date-fns";

import { CheckCircle, Error } from "@material-ui/icons";
import SnackBarAlert from "./pageExtras/SnackBarAlert";

const drawerWidth = 240;

export default function Home() {
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
    { response: pendingBalanceAmountResponse },
    makeGetPendingBalanceAmount,
  ] = useGetPendingBalanceAmount();
  const [
    { response: totalBalanceAmountResponse },
    makeGetTotalBalanceAmount,
  ] = useGetTotalBalanceAmount();

  const [{}, makeLogoutRequest] = useLogoutRequest();

  const handlelogoutClick = () => {
    makeLogoutRequest().then(({ status }) => {
      sessionStorage.clear();
    });
  };

  const [token, setToken] = useState({});

  const getToken = () => {
    const adminData = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ADMIN));
    setToken(adminData);
  };

  const [
    { status: getPendingBalancesStatus },
    makeGetPendingBalances,
  ] = useGetPendingBalances();
  const [
    { status: getTotalBalancesStatus },
    makeGetTotalBalances,
  ] = useGetTotalBalances();

  const { data: totalBalanceAmountData, status: totalBalanceAmountStatus } =
    totalBalanceAmountResponse || {};
  const { data: pendingBalanceAmountData, status: pendingBalanceAmountStatus } =
    pendingBalanceAmountResponse || {};

  const [
    { status: recentExpensesStatus },
    makeGetRecentExpenses,
  ] = useGetRecentExpenses();

  const [recentTableData, setRecentTableData] = useState([]);

  const [pendingBalancesTableData, setPendingBalancesTableData] = useState([]);

  const [pendingBalanceDialogOpen, setPendingBalanceDialogOpen] = useState(
    false
  );

  const handleClosePendingBalancesDialog = () => {
    setPendingBalanceDialogOpen(false);
  };

  const handleOpenPendingBalancesDialog = () => {
    setPendingBalanceDialogOpen(true);
    console.log(token, "heytoken");
  };

  const handleGetPendingBalances = () => {
    makeGetPendingBalances().then(({ status, data, message }) => {
      if (status === STATUS.SUCCESS) {
        const obj1 = data.map(([i, j]) => ({ id: i, pending: j }));

        makeGetTotalBalances().then(({ status, data }) => {
          if (status === STATUS.SUCCESS) {
            const obj2 = data.map(([i, j]) => ({ id: i, total: j }));
            obj2.forEach((a, i) =>
              setPendingBalancesTableData((prev) => [
                ...prev,
                { ...a, pending: obj1 && obj1.length ? obj1[i].pending : "" },
              ])
            );
          }
        });
      }
    });
  };

  const init = () => {
    getToken();
    makeGetPendingBalanceAmount();
    makeGetTotalBalanceAmount();
    makeGetRecentExpenses().then(({ status, data, message }) => {
      if (status === STATUS.SUCCESS) setRecentTableData(data);
      else messageAlert(message || "Unable to connect to servers.");
    });
    handleGetPendingBalances();
  };

  // const formatForPendingTableData = (row) => {
  //   if (!isNaN(row.pending)) {
  //     const { pending, total } = row || { pending: 0.0, total: 0.0 };

  //     return {
  //       ...row,
  //       pending: "??? " + parseFloat(pending).toFixed(2),
  //       total: "??? " + parseFloat(total).toFixed(2),
  //     };
  //   } else {
  //     const { pending, total } = { pending: 0.0, total: 0.0 };
  //     // const pending = 0.0;
  //     // const total = 0.0;

  //     return {
  //       ...row,
  //       pending: "??? " + pending.toFixed(2),
  //       total: "??? " + total.toFixed(2),
  //     };
  //   }
  // };

  React.useEffect(() => {
    console.log(pendingBalanceAmountStatus, "STATUSHUNT");
  }, pendingBalanceAmountStatus);

  React.useEffect(init, []);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightHybrid = clsx(classes.paperRow, classes.fixedHeight);

  return (
    <div>
      <SnackBarAlert {...snackbar} />
      {recentExpensesStatus === FETCHING ||
      totalBalanceAmountStatus === FETCHING ||
      pendingBalanceAmountStatus === FETCHING ? (
        <Loader />
      ) : (
        <div>
          <AddExpense callBack={init} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightHybrid}>
                  <div className={fixedHeightPaper}>
                    <ShowCards
                      title="Total Expenditure"
                      amount={
                        totalBalanceAmountStatus === STATUS.SUCCESS &&
                        totalBalanceAmountData
                      }
                      size="Detailed"
                      buttonRef="#/user/expenses"
                    />
                  </div>
                  <Grid item xs={8}>
                    <Chart
                      data={recentTableData.map((row) => ({
                        time: format(new Date(row.time), "yyyy-mm-dd hh:mm"),
                        amount: row.amount,
                      }))}
                    />
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <ShowCards
                    title="Friends"
                    amount={
                      pendingBalanceAmountStatus === STATUS.SUCCESS &&
                      pendingBalanceAmountData
                    }
                    tableData={pendingBalancesTableData.map((row) => ({
                      ...row,
                      pending: "??? " + parseFloat(row.pending).toFixed(2),
                      total: "??? " + parseFloat(row.total).toFixed(2),
                    }))}
                    tableAttributes={pendingTableBalancesAttributes}
                    tableTitle="Unsettled Balances"
                    open={pendingBalanceDialogOpen}
                    closeDialog={handleClosePendingBalancesDialog}
                    buttonAction={handleOpenPendingBalancesDialog}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders
                    tableData={recentTableData.map((row) => ({
                      ...row,
                      color: token && token.id == row.primaryUser,
                      time: format(new Date(row.time), "MMM d, yyyy HH:mm"),
                      amount:
                        "??? " + parseFloat(row.amount) &&
                        parseFloat(row.amount).toFixed(2),
                      sharedWith:
                        token && token.id == row.primaryUser
                          ? row.sharedUser
                          : row.primaryUser,
                      paidBy:
                        token && token.id == row.primaryUser
                          ? "You"
                          : row.primaryUser,
                      isChecked: row.settled ? (
                        <CheckCircle color="green" />
                      ) : (
                        ""
                      ),
                    }))}
                    tableAttributes={recentExpenseTableAttributes}
                    tableName="Recent Expenses"
                    tableActionLabel="See more Expenses"
                    buttonRef="#/user/expenses"
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
}
const pendingTableBalancesAttributes = [
  { key: "id", name: "Name" },
  { key: "total", name: "Total Shared" },
  { key: "pending", name: "Unpaid Balance" },
];

const recentExpenseTableAttributes = [
  { key: "isChecked" },
  {
    key: "time",
    name: "Date",
  },
  {
    key: "id",
    name: " Expense ID",
  },
  {
    key: "sharedWith",
    name: "Shared With",
  },
  {
    key: "paidBy",
    name: "Paid By",
  },
  {
    key: "remarks",
    name: "Description",
  },
  {
    key: "amount",
    name: "Amount",
    align: "right",
    primaryColor: "green",
    secondaryColor: "red",
    fontWeight: "bold",
  },
];

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
  paperRow: {
    // padding: theme.spacing(2),
    flexDirection: "row",
    display: "flex",
    overflow: "auto",
    justifyContent: "space-between",
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
