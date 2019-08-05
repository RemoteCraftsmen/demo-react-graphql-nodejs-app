import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AppBar, Tabs, Tab } from "@material-ui/core";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <AppBar position="static">
          <Tabs value={location.pathname} centered>
            <Tab label="Dashboard" component={Link} to="/" />
            <Tab label="Sign up" component={Link} to="/signup" />
            <Tab
              label="Login"
              href="#basic-tabs"
              component={Link}
              to="/login"
            />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(Navbar);
