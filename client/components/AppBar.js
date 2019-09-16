import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, Button } from "@material-ui/core";
import { graphql } from "react-apollo";
import { SIGNOUT_MUTATION } from "../utils/UserRequests";

const styles = theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  }
});

class AppBar extends Component {
  signOut = () => {
    this.props
      .mutate({
        mutation: SIGNOUT_MUTATION,
        refetchQueries: ["Me"]
      })
      .then(() => {
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h5"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Dashboard
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            this.signOut();
          }}
        >
          Logout
        </Button>
      </Toolbar>
    );
  }
}

export default graphql(SIGNOUT_MUTATION)(withStyles(styles)(AppBar));
