import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CheckCircle, Error } from "@material-ui/icons";

import {
  useCreateNewAccount,
  useCheckUsernameAvailability,
} from "../../services/expenseService";
import { ERROR, FETCHING } from "../../hooks/useApiRequest/actionTypes";
import { STATUS, STORAGE_KEYS } from "../../helpers/constants";
import { CircularProgress, InputAdornment, Tooltip } from "@material-ui/core";

const SignUp = ({ callBackFunction }) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [autoFillUser, setAutoFillUser] = useState(true);

  const [
    { status: checkUsernameAvailabilityStatus },
    makeCheckUsernameAvailabilty,
  ] = useCheckUsernameAvailability();

  const [userExists, setUserExists] = useState(false);

  const handleCheckUsername = (username) => {
    makeCheckUsernameAvailabilty({ username }).then(({ status, data }) => {
      if (status == STATUS.SUCCESS) {
        setUserExists(data);
        console.log(data);
      }
    });
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
    makeCreateNewAccount(username, password, firstName, lastName, email).then(
      ({ status, data, message }) => {
        if (status === STATUS.SUCCESS) {
          callBackFunction();
        }
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
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
                id="lastName"
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
                id="email"
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
                id="username"
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
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
        </form>
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
