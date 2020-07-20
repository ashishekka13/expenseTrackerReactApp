// import React from "react";

// const Loader = () => {
//   return <div className="loading">Loading&#8230;</div>;
// };

// export default Loader;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
// import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
  root: {
    flexGrow: 2,
  },
  loadDialog: {
    flexGrow: 1,
    width: `calc(100%)`,
  },
  loader: {
    flexGrow: 1,
  },
}));

export default function Loader(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={true}
        // onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        // className={classes.loadDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title || "Please Wait"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content || "Fetching Data.."}
          </DialogContentText>
          <div className="loading-linear">
            <LinearProgress color="primary" className={classes.loader} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function LinearLoader() {
  const classes = useStyles();

  return (
    <div className="loading-linear" className={styleMedia.root}>
      {/* <LinearProgress color="primary"/> */}
    </div>
  );
}
