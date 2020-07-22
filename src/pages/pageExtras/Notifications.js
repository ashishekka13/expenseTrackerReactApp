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
import LogoutIcon from "@material-ui/icons/Lock";

import {
  useGetTotalBalanceAmount,
  useGetPendingBalanceAmount,
  useGetRecentExpenses,
  useLogoutRequest,
  useFetchUnseenNotifications,
  useMarkNotificationAsSeen,
} from "../../services/expenseService";

import {
  Popover,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import { STATUS, LOGGER, LOGCONTEXT } from "../../helpers/constants";
import { format } from "date-fns";

export default function RenderNotifications() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [unseenNotifications, setUnseenNotifications] = useState([]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [{}, makefetchUnseenNotifications] = useFetchUnseenNotifications();

  const formatNotifications = (data) => {
    if (data && data.length != 0) {
      return data.map((row) => ({
        id: row.id,
        user: row.primaryUser,
        action: LOGGER[row.logDescriptor] + " (ID #" + row.eid + ")",
        date: format(new Date(row.timestamp), "HH:mm MMM dd, yyyy"),
        context: LOGCONTEXT[row.logDescriptor],
      }));
    }
    return [];
  };

  const [badgeNumber, setBadgeNumber] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (unseenNotifications && unseenNotifications.length != 0) {
      unseenNotifications.map((row) =>
        makeMarkNotificationAsSeen({ id: row.id })
      );
      setBadgeNumber(0);
    }
  };

  const loadNotifications = () => {
    makefetchUnseenNotifications().then(({ status, data }) => {
      if (status === STATUS.SUCCESS) {
        setUnseenNotifications(formatNotifications(data));
        // console.log(data, "YESSSS");
        if (data && data.length != 0) setBadgeNumber(data.length);
      }
    });
  };

  const [{}, makeMarkNotificationAsSeen] = useMarkNotificationAsSeen();

  const markAsRead = (id) => {
    makeMarkNotificationAsSeen({ id: id });
  };

  useEffect(loadNotifications, []);

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={badgeNumber} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item className={classes.typography}>
              <NotificationsIcon color="disabled" />
            </Grid>
            <Grid item className={classes.typography}>
              <Typography variant="h6" color="primary">
                Notification Panel
              </Typography>
            </Grid>
          </Grid>

          <List className={classes.root}>
            {unseenNotifications && unseenNotifications.length ? (
              unseenNotifications.map((row) => (
                <div>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Ashish" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="subtitle2">
                            {row.user}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {" " + row.action}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="caption"
                            className={classes.inline}
                            // color="textPrimary"
                          >
                            {row.date}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </div>
              ))
            ) : (
              <div>
                <ListItem alignItems="flex-start">
                  No new notifications.
                </ListItem>
              </div>
            )}
          </List>
        </div>
      </Popover>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    width: "48ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  typography: {
    padding: theme.spacing(2),
  },
}));
