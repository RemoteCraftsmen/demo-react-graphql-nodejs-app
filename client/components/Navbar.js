import React, { Component } from "react";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Link } from "@material-ui/core";

const LOGGED_IN_USER = gql`
  query Me {
    me {
      id
    }
  }
`;

const SIGN_OUT = gql`
  mutation signOut {
    signOut
  }
`;

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
      <Query query={LOGGED_IN_USER}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) console.log(error);
          return (
            <AppBar position="static">
              <Toolbar component="nav" className={classes.root}>
                {data !== undefined ? (
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
                      mutation={SIGN_OUT}
                      refetchQueries={() => {
                        return [
                          {
                            query: LOGGED_IN_USER
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
                            signOut().then(res => {
                              if (!res.errors) {
                                this.props.history.push("/login");
                              } else {
                                this.setState({ errors: res.errors });
                                console.log(this.errors);
                              }
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
