import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
  useGetPersonalDetails,
  useUpdateEmail,
  useUpdateFullName,
  useUpdatePassword,
} from "../services/expenseService";

import { STATUS, STORAGE_KEYS } from "../helpers/constants";
import { FETCHING, SUCCESS } from "../hooks/useApiRequest/actionTypes";
// Generate Order Data
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";

import Loader from "../extras/Loader";

import {
  Grid,
  Divider,
  AccordionActions,
  Button,
  TextField,
} from "@material-ui/core";
import { id } from "date-fns/locale";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(5),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  textField: {
    fontSize: theme.typography.pxToRem(15),
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();

  const [fullNameOpen, setFullNameOpen] = React.useState(false);
  const [usernameOpen, setUsernameOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  const [
    { status: getPersonalDetailsStatus, response: getPersonalDetailsResponse },
    makeGetPersonalDetails,
  ] = useGetPersonalDetails() || {};

  const { data: personalDetails } = getPersonalDetailsResponse || {};

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => makeGetPersonalDetails(), []);

  const [{}, makeUpdateFullName] = useUpdateFullName();
  const [{}, makeUpdateEmail] = useUpdateEmail();
  const [{}, makeUpdatePassword] = useUpdatePassword();

  const handleUpdateName = () => {
    makeUpdateFullName({ firstName, lastName });
  };
  const handleUpdateEmail = () => {
    makeUpdateEmail({ email });
  };
  const handleUpdatePassword = () => {
    makeUpdatePassword({ password });
  };

  return (
    <div>
      {getPersonalDetailsStatus === FETCHING ? (
        <Loader />
      ) : (
        <Grid
          container
          direction="column"
          spacing={5}
          alignItems="center"
          justify="space-evenly"
        >
          <Grid item sm={12} md={8}>
            <div className={classes.root}>
              <Accordion expanded={fullNameOpen}>
                <AccordionSummary
                  expandIcon={
                    <EditIcon onClick={() => setFullNameOpen(true)} />
                  }
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>Full Name</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {personalDetails && (
                      <div>
                        {personalDetails.firstName} {personalDetails.lastName}
                      </div>
                    )}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="row" spacing={4} justify="center">
                    <Grid item xs={3} />
                    <Grid item xs={4}>
                      <TextField
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        size="small"
                        value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}
                        classes={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        size="small"
                        value={lastName}
                        onChange={({ target }) => setLastName(target.value)}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Button size="small" onClick={() => setFullNameOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleUpdateName}
                  >
                    Save
                  </Button>
                </AccordionActions>
              </Accordion>
              <Accordion
                expanded={usernameOpen}
                onChange={() => setUsernameOpen((prev) => !prev)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography className={classes.heading}>Username</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {personalDetails && <div>{personalDetails.username}</div>}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.secondaryHeading}>
                    Sorry, You can't change your username.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={passwordOpen}
                onClick={() => {
                  setPasswordOpen((prev) => !prev);
                  setPassword("");
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography className={classes.heading}>Password</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {personalDetails && (
                      <div>{"•".repeat(personalDetails.passwordLength)}</div>
                    )}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="row" justify="flex-end">
                    <Grid item xs={8}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        size="small"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Button
                    size="small"
                    onClick={() => {
                      setPasswordOpen(false);
                      setPassword("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleUpdatePassword}
                  >
                    Save
                  </Button>
                </AccordionActions>
              </Accordion>
              <Accordion
                expanded={emailOpen}
                onChange={() => setEmailOpen((prev) => !prev)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography className={classes.heading}>Email</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {personalDetails && <div>{personalDetails.email}</div>}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="row" justify="flex-end">
                    <Grid item xs={8}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        size="small"
                        onChange={({ target }) => setEmail(target.value)}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Button size="small" onClick={() => setEmailOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleUpdateEmail}
                  >
                    Save
                  </Button>
                </AccordionActions>
              </Accordion>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
