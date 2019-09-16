import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { graphql } from "react-apollo";
import { Query } from "react-apollo";
import { IS_LOGGED_IN_QUERY, SIGNOUT_MUTATION } from "../utils/UserRequests";

const styles = theme => ({
  root: {
    justifyContent: "center"
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    padding: theme.spacing(3),
    font: "19px Helvatica",
    "&:hover": {
      fontWeight: "550"
    }
  },
  active: {
    borderBottom: "2px solid white"
  }
});

class Navbar extends Component {
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
      <Query query={IS_LOGGED_IN_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) console.log(error);
          return (
            <AppBar position="static" color="primary">
              <Toolbar component="nav" className={classes.root}>
                {data.me !== null ? (
                  <React.Fragment>
                    <NavLink
                      activeClassName={classes.active}
                      className={classes.navLink}
                      to="/dashboard"
                    >
                      DASHBOARD
                    </NavLink>
                    <NavLink
                      activeClassName={classes.active}
                      className={classes.navLink}
                      component="button"
                      to="/logout"
                      onClick={() => {
                        this.signOut();
                      }}
                    >
                      LOGOUT
                    </NavLink>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <NavLink
                      activeClassName={classes.active}
                      className={classes.navLink}
                      to="/signup"
                    >
                      SIGN UP
                    </NavLink>
                    <NavLink
                      activeClassName={classes.active}
                      className={classes.navLink}
                      to="/login"
                    >
                      LOGIN
                    </NavLink>
                  </React.Fragment>
                )}
              </Toolbar>
            </AppBar>
          );
        }}
      </Query>
    );
  }
}

export default graphql(SIGNOUT_MUTATION)(
  withRouter(withStyles(styles)(Navbar))
);
