import React, { Component } from "react";
import { withRouter } from "react-router";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Link } from "@material-ui/core";
import { IS_LOGGED_IN_QUERY, SIGNOUT_MUTATION } from "./UserRequests";

const styles = theme => ({
  root: {
    justifyContent: "center"
  },
  navLink: {
    padding: theme.spacing(3),
    font: "18px Helvatica",
    "&:hover": {
      color: "white",
      textDecoration: "none"
    }
  }
});

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={IS_LOGGED_IN_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) console.log(error);
          console.log(data);
          return (
            <AppBar position="static">
              <Toolbar component="nav" className={classes.root}>
                {data.me !== null ? (
                  <React.Fragment>
                    <Link
                      noWrap
                      href="/dashboard"
                      color="inherit"
                      className={classes.navLink}
                    >
                      DASHBOARD
                    </Link>
                    <Mutation
                      mutation={SIGNOUT_MUTATION}
                      refetchQueries={() => {
                        return [
                          {
                            query: IS_LOGGED_IN_QUERY
                          }
                        ];
                      }}
                    >
                      {signOut => (
                        <Link
                          color="inherit"
                          component="button"
                          className={classes.navLink}
                          onClick={e => {
                            signOut()
                              .then(res => {
                                this.props.history.push("/login");
                              })
                              .catch(err => {
                                console.log(err.message);
                              });
                          }}
                        >
                          LOGOUT
                        </Link>
                      )}
                    </Mutation>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link
                      noWrap
                      href="/signup"
                      color="inherit"
                      className={classes.navLink}
                    >
                      SIGN UP
                    </Link>
                    <Link
                      noWrap
                      href="/login"
                      color="inherit"
                      className={classes.navLink}
                    >
                      LOGIN
                    </Link>
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

export default withRouter(withStyles(styles)(Navbar));
