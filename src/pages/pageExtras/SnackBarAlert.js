import React, { useEffect } from "react";
import { Snackbar, Button } from "@material-ui/core";
import {
  fade,
  withStyles,
  makeStyles,
  createMuiTheme,
  useTheme,
} from "@material-ui/core/styles";
import useStyles from "../../styles/material";

const SnackBarAlert = (props) => {
  const [snackbar, setSnackbar] = React.useState({ open: true, message: "" });

  const messageAlertClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const messageAlert = () => {
    if (props.token !== undefined) {
      {
        if (props.token !== snackbar.token)
          setSnackbar({
            open: props.open,
            message: props.message,
            token: props.token,
          });
      }
    }
  };

  const classes = useStyles();

  React.useEffect(messageAlert, [props.token]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snackbar.open}
        autoHideDuration={
          (snackbar &&
            snackbar.message &&
            snackbar.message.length &&
            (snackbar.message.length - 30) * 50 + 3000) ||
          3000
        }
        onClose={messageAlertClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        className={classes.snackAlert}
        // style={{ zIndex: 9999999 }}
        message={<span id="message-id">{snackbar.message}</span>}
        action={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            onClick={messageAlertClose}
          >
            CLOSE
          </Button>,
        ]}
      />
    </>
  );
};

export default SnackBarAlert;
