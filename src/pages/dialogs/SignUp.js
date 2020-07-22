import { CircularProgress, InputAdornment, Tooltip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { CheckCircle, Error } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { STATUS } from "../../helpers/constants";
import { FETCHING } from "../../hooks/useApiRequest/actionTypes";
import {
  useCheckUsernameAvailability,
  useCreateNewAccount,
} from "../../services/expenseService";
import SnackBarAlert from "../pageExtras/SnackBarAlert";

const SignUp = ({ callBackFunction }) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [autoFillUser, setAutoFillUser] = useState(true);

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
    { status: checkUsernameAvailabilityStatus },
    makeCheckUsernameAvailabilty,
  ] = useCheckUsernameAvailability();

  const [userExists, setUserExists] = useState(false);

  const handleCheckUsername = (username) => {
    makeCheckUsernameAvailabilty({ username }).then(
      ({ status, data, message }) => {
        if (status == STATUS.SUCCESS) {
          setUserExists(data);
          console.log(data);
        } else {
          messageAlert(message || "Unable to check for availabilty");
        }
      }
    );
  };

  const handleInputChange = ({ target }) => {
    const { value, name } = target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        if (autoFillUser) {
          setUsername(value.split("@", 1)[0]);
          handleCheckUsername(value.split("@", 1)[0]);
        }
        break;
      case "username":
        setAutoFillUser(false);
        setUsername(value);
        handleCheckUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const [
    { status: createNewAccountStatus },
    makeCreateNewAccount,
  ] = useCreateNewAccount();

  const handleCreateNewUserAccount = () => {
    makeCreateNewAccount({
      username,
      password,
      firstName,
      lastName,
      email,
    }).then(({ status, data, message }) => {
      if (status === STATUS.SUCCESS) {
        messageAlert(
          "Account Created Successfully. Please wait... Redirecting"
        );

        setTimeout(callBackFunction, 2500);
      } else {
        messageAlert(
          message || "Failed to connect to the server. Try Again later"
        );
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SnackBarAlert {...snackbar} />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                // id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {checkUsernameAvailabilityStatus === FETCHING ? (
                        <CircularProgress size={20} />
                      ) : !userExists && username.length > 0 ? (
                        <Tooltip title="Username is available" aria-label="add">
                          <CheckCircle htmlColor="green" />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title="Username not available"
                          aria-label="add"
                        >
                          <Error color="error" />
                        </Tooltip>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                // label="Password"
                type="password"
                // id="password"
                // autoComplete="current-password"
                value={password}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreateNewUserAccount}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
