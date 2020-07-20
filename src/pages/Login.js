import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Styles from "../styles/material";

import SignUp from "./dialogs/SignUp";
import { useLoginRequest } from "../services/expenseService";
import { ERROR } from "../hooks/useApiRequest/actionTypes";
import { STATUS, STORAGE_KEYS } from "../helpers/constants";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";

const Login = ({ history }) => {
  React.useEffect(() => {
    sessionStorage.clear();
  }, []);

  const classes = Styles();

  const [{ response: getLoginResponse }, makeLoginRequest] = useLoginRequest();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    // console.log("trigger");
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
    // console.log(value);
  };

  const onLoginClick = () => {
    makeLoginRequest({ username, password }).then(
      ({ status, data, message }) => {
        if (status === STATUS.SUCCESS) {
          const { token } = data;

          sessionStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(token));
          history.push("/");
        }
        if (status === STATUS.FAILED) {
          console.log("FAILED");
        }
      }
    );
  };

  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);

  //Adding support for enter key
  const handleLoginKeyNavigation = (target) => {
    if (target.charCode == 13) {
      onLoginClick();
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Dialog open={openSignUpDialog}>
        <DialogContent>
          <SignUp callBackFunction={() => setOpenSignUpDialog(false)} />
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => setOpenSignUpDialog(false)} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={handleInputChange}
              value={username}
              onKeyPress={handleLoginKeyNavigation}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleInputChange}
              value={password}
              onKeyPress={handleLoginKeyNavigation}
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onLoginClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => setOpenSignUpDialog(true)} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
