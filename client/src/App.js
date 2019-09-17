import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import TodoPanel from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={TodoPanel} />
        </Switch>
      </div>
    );
  }
}

export default App;
